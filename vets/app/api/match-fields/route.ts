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
                        "text": "Given the following text, extract data that fit the format of the output schema. Remember all the values must be from the document. Document: " + document
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
                                "gender": {
                                    "type": "string",
                                    "description": "The gender of the pet"
                                },
                                "sterilized": {
                                    "type": "boolean",
                                    "description": "Whether the pet is sterilized"
                                },
                                "birthdate": {
                                    "type": "string",
                                    "description": "Birthdate of the pet in YYYY-MM-DD format"
                                }
                            },"required": ["name", "breed", "age", "weight", "gender", "birthdate", "sterilized"],
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
                                "gender": {
                                    "type": "string",
                                    "description": "Gender of the pet owner"
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
                            },"required": ["email", "firstName", "lastName", "phoneNumber", "address", "userType", "birthdate", "gender", "contactPreference", "username"],
                            "additionalProperties": false
                        },
                        "billing": {
                            "type": "array",
                            "description": "Billing information for pet services",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Name of the service"
                                    },
                                    "date": {
                                        "type": "string",
                                        "description": "Date of the service in YYYY-MM-DD format"
                                    },
                                    "cost": {
                                        "type": "number",
                                        "description": "Cost of the service"
                                    },
                                    "status": {
                                        "type": "string",
                                        "description": "Payment status of the service"
                                    }
                                },
                                "required": ["name", "date", "cost", "status"],
                                
                            "additionalProperties": false
                            }, "required": [],
                            "additionalProperties": false
                        },
                        "appointments": {
                            "type": "array",
                            "description": "Appointment information for pets",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Name of the appointment"
                                    },
                                    "date": {
                                        "type": "string",
                                        "description": "Date of the appointment in YYYY-MM-DD format"
                                    },
                                    "time": {
                                        "type": "string",
                                        "description": "Time of the appointment in HH:MM:SS format"
                                    },
                                    "location": {
                                        "type": "string",
                                        "description": "Location of the appointment"
                                    },
                                    "status": {
                                        "type": "string",
                                        "description": "Status of the appointment"
                                    }
                                },
                                "required": ["name", "date", "time", "location", "status"],
                                "additionalProperties": false

                            }
                            , "required": [],
                            "additionalProperties": false
                        }
                    },
                    "required": [
                        "petInfo",
                        "userInfo",
                        "billing",
                        "appointments"
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