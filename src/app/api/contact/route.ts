import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: "Input exceeds maximum length" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const newMessage = await db.message.create({
      data: { name, email, message },
    })

    return NextResponse.json({ success: true, id: newMessage.id })
  } catch (error) {
    console.error("Contact form error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const messages = await db.message.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Fetch messages error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}