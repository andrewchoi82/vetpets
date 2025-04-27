import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId');

  if (!doctorId) {
    return NextResponse.json({ error: "doctorId parameter is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("pets")
      .select(`
        userId,
        users!userId (
          userType,
          firstName,
          lastName,
          birthdate,
          sex,
          phoneNumber,
          email,
          contactPreference,
          address,
          username,
          profilePic
        )
      `)
      .eq("doctorId", doctorId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    // Get unique users by userId and combine the data
    const uniqueUsers = data.reduce((acc: any[], curr: any) => {
      const existingUser = acc.find(user => user.userId === curr.userId);
      if (!existingUser) {
        // Count how many pets this user has
        const numOfPets = data.filter(item => item.userId === curr.userId).length;
        acc.push({
          ...curr.users,
          userId: curr.userId,
          numOfPets: numOfPets
        });
      }
      return acc;
    }, []);

    return NextResponse.json(uniqueUsers);
  } catch (err) {
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
