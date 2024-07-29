import Form from "@/app/(components)/Form";
import { Ticket } from "@/app/types";

type TicketPageProps = {
  params: {
    mode: string;
  };
};

type ResType = {
  ticket: Ticket;
};

const getTicketById = async (id: string): Promise<ResType> => {
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("An Error Has Been Occurred While Retrieving The Data");
  }

  return res.json();
};

const TicketPage = async ({ params }: TicketPageProps) => {
  // Parametreye göre hangi mod'da olacağına karar ver
  const editMode = params.mode === "new" ? false : true;
  let updatedItem = null;

  if (editMode) {
    // URL'deki ID'ye göre ticket verilerini al
    const data = await getTicketById(params.mode);
    updatedItem = data.ticket;
  }

  return (
    <div>
      <Form updatedItem={updatedItem} />
    </div>
  );
};

export default TicketPage;
