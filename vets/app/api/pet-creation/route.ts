import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

interface PetInfo {
  name: string;
  breed: string;
  age: string;
  weight: number;
  sex: string;
  sterilized: boolean;
  birthdate: string;
}

interface UserInfo {
  email: string;
  userType: number;
  birthdate: string;
  sex: string;
  phoneNumber: number;
  contactPreference: string;
  address: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface Vaccination {
  name: string;
  manufacturer: string;
  dosage: number;
  administeredBy: string;
}

interface Medication {
  date: string;
  medication: string;
  frequency: string;
  status: string;
}

interface Test {
  name: string;
  dateOrdered: string;
  dateExpected: string;
  status: string;
  result: string;
}

interface MedicalHistory {
  date: string;
  category: string;
}

interface Content {
  petInfo: PetInfo;
  userInfo: UserInfo;
  vaccinations: Vaccination[];
  medications: Medication[];
  tests: Test[];
  medicalHistory: MedicalHistory[];
}

interface RequestData {
  id: string;
  content: string;
  doctorId: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requestId = searchParams.get('requestId');
  const userId = searchParams.get('userId');

  if (!requestId) return NextResponse.json({ error: 'requestId is required' }, { status: 400 });
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });

  try {
    // Get the request data
    const { data: requestData, error: requestError } = await supabase
      .from('requests')
      .select('*')
      .eq('requestId', requestId)
      .single();

    if (requestError) {
      console.error('Error fetching request:', requestError);
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (!requestData) {
      console.error('No request data found for ID:', requestId);
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Parse and validate content
    let content: Content;
    try {
      // First parse to handle potential double-escaped JSON
      const firstParse = JSON.parse(requestData.content);
      const data = typeof firstParse === "string" ? JSON.parse(firstParse) : firstParse;
      
      // Debug type checking
      console.log('Type checking results:');
      console.log('petInfo.weight type:', typeof data.petInfo?.weight);
      console.log('petInfo.sex type:', typeof data.petInfo?.sex);
      console.log('vaccinations is array:', Array.isArray(data.vaccinations));
      console.log('medications is array:', Array.isArray(data.medications));
      console.log('tests is array:', Array.isArray(data.tests));
      console.log('medicalHistory is array:', Array.isArray(data.medicalHistory));
      
      // Validate content structure
      if (isValidContent(data)) {
        console.log('Content validation: PASSED! ✅');
        content = data;
      } else {
        console.log('Content validation: FAILED! ❌');
        throw new Error('Invalid content structure');
      }
    } catch (error) {
      console.error('Error parsing content:', error);
      return NextResponse.json({ error: 'Invalid content format' }, { status: 400 });
    }

    // Create pet using petInfo
    const petResponse = await fetch('http://localhost:3000/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: parseInt(userId),
        doctorId: requestData.doctorId,
        ...content.petInfo
      }),
    });

    if (!petResponse.ok) {
      const errorData = await petResponse.json();
      console.error('Pet creation failed:', {
        status: petResponse.status,
        statusText: petResponse.statusText,
        error: errorData
      });
      return NextResponse.json({ error: 'Failed to create pet' }, { status: 500 });
    }

    const { petId } = await petResponse.json() as { petId: string };
    console.log('Pet created successfully with ID:', petId);

    // Create vaccinations
    for (const vaccination of content.vaccinations) {
      const vaccinationResponse = await fetch('http://localhost:3000/api/vaccinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...vaccination,
          petId
        }),
      });

      if (!vaccinationResponse.ok) {
        const errorData = await vaccinationResponse.json();
        console.error('Vaccination creation failed:', {
          status: vaccinationResponse.status,
          statusText: vaccinationResponse.statusText,
          error: errorData,
          vaccination
        });
        return NextResponse.json({ error: 'Failed to create vaccination' }, { status: 500 });
      }
    }

    // Create medications
    for (const medication of content.medications) {
      const medicationResponse = await fetch('http://localhost:3000/api/medications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...medication,
          petId
        }),
      });

      if (!medicationResponse.ok) {
        const errorData = await medicationResponse.json();
        console.error('Medication creation failed:', {
          status: medicationResponse.status,
          statusText: medicationResponse.statusText,
          error: errorData,
          medication
        });
        return NextResponse.json({ error: 'Failed to create medication' }, { status: 500 });
      }
    }

    // Create tests
    for (const test of content.tests) {
      const testResponse = await fetch('http://localhost:3000/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...test,
          petId
        }),
      });

      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        console.error('Test creation failed:', {
          status: testResponse.status,
          statusText: testResponse.statusText,
          error: errorData,
          test
        });
        return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
      }
    }

    // Create medical history
    for (const history of content.medicalHistory) {
      const historyResponse = await fetch('http://localhost:3000/api/medical-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...history,
          petId
        }),
      });

      if (!historyResponse.ok) {
        const errorData = await historyResponse.json();
        console.error('Medical history creation failed:', {
          status: historyResponse.status,
          statusText: historyResponse.statusText,
          error: errorData,
          history
        });
        return NextResponse.json({ error: 'Failed to create medical history' }, { status: 500 });
      }
    }

    return NextResponse.json({ petId });
  } catch (error) {
    console.error('Error in pet-creation route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Type guard to validate content structure
function isValidContent(content: any): content is Content {
  return (
    typeof content === 'object' &&
    content !== null &&
    typeof content.petInfo === 'object' &&
    content.petInfo !== null &&
    typeof content.petInfo.name === 'string' &&
    typeof content.petInfo.breed === 'string' &&
    typeof content.petInfo.age === 'string' &&
    typeof content.petInfo.weight === 'number' &&
    typeof content.petInfo.sex === 'string' &&
    typeof content.petInfo.sterilized === 'boolean' &&
    typeof content.petInfo.birthdate === 'string' &&
    Array.isArray(content.vaccinations) &&
    Array.isArray(content.medications) &&
    Array.isArray(content.tests) &&
    Array.isArray(content.medicalHistory)
  );
}
