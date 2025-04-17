import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";
export async function POST(request: NextRequest) {
  const { transcript } = await request.json();


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
            "text": "You are a professional journaler. You will extract relevant info that is fun and memorable, making sure that all of the info is grounded in the user's experiences."
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Given the following transcript, extract fun and memorable comments that fit the format of the output schema. Remember all of your responses need to be grounded in the user's true experiences. Keep responses concise. Transcript: " + transcript
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
        "name": "artifact",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The individuals name in possesive form. Make it quirky and representative of the mood. An example name for an individual who was sleep deprived could be Jason Hasn't Slept's"
            },
            "event": {
              "type": "string",
              "description": "The event associated with the user transcript. Try to make it one word if possible. Use nicknames, abbreviations, how the user refers to the event."
            },
            "vibe": {
              "type": "string",
              "description": "The vibe or mood related to the artifact in one word. It should be a completion of the sentence, {event}'s vibe is... "
            },
            "backgroundColor": {
              "type": "string",
              "description": "The background color of the artifact. It should be one of these four: Light Beige, Off-White/ Cream, Pale Gray, Light Blue"
            },
            "quoteQuestion": {
              "type": "string",
              "description": "A question relating to the user's experience that invites curiosity, and is also directly answered by a user quote. Phrase it in the third person to an unkown audience. Mention the user by name."
            },
            "quote": {
              "type": "string",
              "description": "The quote from the user that answers the quote question. Give the exact text."
            },
            "additionalInfo": {
              "type": "string",
              "description": "Any additional information that complements the artifact and maybe jokes or pokes fun at the user's experience. Please keep this short and sweet."
            }
          },
          "required": [
            "name",
            "event",
            "vibe",
            "backgroundColor",
            "quoteQuestion",
            "quote",
            "additionalInfo"
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