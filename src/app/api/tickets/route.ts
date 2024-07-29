import { NextResponse } from "next/server";
import Ticket from "../(models)/Ticket";
import { Ticket as TicketType } from "@/app/types";

// yeni ticket oluştur
export async function POST(req: Request) {
  try {
    // İsteğin body kısmına eriş
    const body = await req.json();

    // Veritbanına ticket'ı kaydet
    const newTicket = await Ticket.create(body);

    // Cevap gönder
    return NextResponse.json(
      {
        message: "Ticket Has Been Created",
        data: newTicket,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "An Error Occurred While Creating The Ticket",
      },
      { status: 500 }
    );
  }
}

// Bütün ticketları gönder
export async function GET(req: Request) {
  try {
    const tickets: TicketType[] = await Ticket.find();

    return NextResponse.json(
      {
        tickets,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something Went Wrong!!",
        err,
      },
      { status: 500 }
    );
  }
}
