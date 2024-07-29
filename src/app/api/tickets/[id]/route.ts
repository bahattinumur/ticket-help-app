import { NextResponse } from "next/server";
import Ticket from "../../(models)/Ticket";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    await Ticket.findByIdAndDelete(params.id);

    return NextResponse.json(
      {
        message: "Has Been Deleted Successfuly",
      },
      { status: 200 }
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

export async function GET(req: Request, { params }: Params) {
  try {
    const ticket = await Ticket.findById(params.id);

    return NextResponse.json({ ticket });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something Went Wrong, While Trying to get Tickets Data",
        err,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    // İsteğin body verisinde eriş
    const body = await req.json();

    // Veritabanındaki ticket'ı güncelle
    const updated = await Ticket.findByIdAndUpdate(params.id, body);

    // Client'a cevap gönder
    return NextResponse.json({ updated });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something Went Wrong, While Updating to The Tickets Data",
        err,
      },
      { status: 500 }
    );
  }
}
