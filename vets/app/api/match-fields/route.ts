import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";
export async function POST(request: NextRequest) {
    const { document } = await request.json();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You are a professional document parser. You will go through the text input and extract values that match as close as possible to the input fields"
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Given the following text, extract data that fit the format of the output schema. Remember all the values must be from the document and NOT be blank. Document: " + document
                    }
                ]
            }
        ],
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
            "type": "json_schema",
            "json_schema": {
                "name": "values",
                "strict": true,
                "schema": {
                    "type": "object",
                    "properties": {
                        "petInfo": {
                            "type": "object",
                            "description": "Basic information about the pet and their current situation",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "The name of the pet"
                                },
                                "breed": {
                                    "type": "string",
                                    "description": "The breed of the pet"
                                },
                                "age": {
                                    "type": "string",
                                    "description": "The age of the pet"
                                },
                                "weight": {
                                    "type": "number",
                                    "description": "The weight of the pet"
                                },
                                "sex": {
                                    "type": "string",
                                    "description": "The sex of the pet"
                                },
                                "sterilized": {
                                    "type": "boolean",
                                    "description": "Whether the pet is sterilized"
                                },
                                "birthdate": {
                                    "type": "string",
                                    "description": "Birthdate of the pet in YYYY-MM-DD format"
                                }
                            },
                            "required": ["name", "breed", "age", "weight", "sex", "birthdate", "sterilized"],
                            "additionalProperties": false
                        },
                        "userInfo": {
                            "type": "object",
                            "description": "Information of pet owner",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "description": "Email address of the pet owner"
                                },
                                "userType": {
                                    "type": "integer",
                                    "description": "Type of user in the system"
                                },
                                "birthdate": {
                                    "type": "string",
                                    "description": "Birthdate of the pet owner in YYYY-MM-DD format"
                                },
                                "sex": {
                                    "type": "string",
                                    "description": "Sex of the pet owner"
                                },
                                "phoneNumber": {
                                    "type": "integer",
                                    "description": "Contact phone number of the pet owner"
                                },
                                "contactPreference": {
                                    "type": "string",
                                    "description": "Preferred contact method for the pet owner"
                                },
                                "address": {
                                    "type": "string",
                                    "description": "Physical address of the pet owner"
                                },
                                "username": {
                                    "type": "string",
                                    "description": "Username for the pet owner's account"
                                },
                                "firstName": {
                                    "type": "string",
                                    "description": "First name of the pet owner"
                                },
                                "lastName": {
                                    "type": "string",
                                    "description": "Last name of the pet owner"
                                }
                            },
                            "required": ["email", "firstName", "lastName", "phoneNumber", "address", "userType", "birthdate", "sex", "contactPreference", "username"],
                            "additionalProperties": false
                        },
                        "vaccinations": {
                            "type": "array",
                            "description": "Vaccination records for the pet",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Name of the vaccine"
                                    },
                                    "manufacturer": {
                                        "type": "string",
                                        "description": "Manufacturer of the vaccine"
                                    },
                                    "dosage": {
                                        "type": "number",
                                        "description": "Dosage of the vaccine"
                                    },
                                    "administeredBy": {
                                        "type": "string",
                                        "description": "Who administered the vaccine"
                                    }
                                },
                                "required": ["name", "manufacturer", "dosage", "administeredBy"],
                                "additionalProperties": false
                            }
                        },
                        "medications": {
                            "type": "array",
                            "description": "Medication records for the pet",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "date": {
                                        "type": "string",
                                        "description": "Date of medication in YYYY-MM-DD format"
                                    },
                                    "medication": {
                                        "type": "string",
                                        "description": "Name of the medication"
                                    },
                                    "frequency": {
                                        "type": "string",
                                        "description": "Frequency of medication"
                                    },
                                    "status": {
                                        "type": "string",
                                        "description": "Status of the medication"
                                    }
                                },
                                "required": ["date", "medication", "frequency", "status"],
                                "additionalProperties": false
                            }
                        },
                        "tests": {
                            "type": "array",
                            "description": "Test records for the pet",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Name of the test"
                                    },
                                    "dateOrdered": {
                                        "type": "string",
                                        "description": "Date test was ordered in YYYY-MM-DD format"
                                    },
                                    "dateExpected": {
                                        "type": "string",
                                        "description": "Expected date of results in YYYY-MM-DD format. Must not be empty. Use dateOrdered date if not available"
                                    },
                                    "status": {
                                        "type": "string",
                                        "description": "Status of the test"
                                    }
                                },
                                "required": ["name", "dateOrdered", "dateExpected", "status"],
                                "additionalProperties": false
                            }
                        },
                        "medicalHistory": {
                            "type": "array",
                            "description": "Medical history records for the pet",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "date": {
                                        "type": "string",
                                        "description": "Date of medical history entry in YYYY-MM-DD format"
                                    },
                                    "category": {
                                        "type": "string",
                                        "description": "Category of the medical history entry"
                                    }
                                },
                                "required": ["date", "category"],
                                "additionalProperties": false
                            }
                        }
                    },
                    "required": [
                        "petInfo",
                        "userInfo",
                        "vaccinations",
                        "medications",
                        "tests",
                        "medicalHistory"
                    ],
                    "additionalProperties": false
                }
            }
        }
    });

    const content = response.choices[0].message.content


    return NextResponse.json({
        content: content,
    });
}