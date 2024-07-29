"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Ticket } from "../types";

type Props = {
  updatedItem: Ticket | null;
};

const Form = ({ updatedItem }: Props) => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // FormData örneği al
    const formData = new FormData(e.target as HTMLFormElement);

    // İnputlardaki verileri bir nesneye aktardık
    const ticketData = Object.fromEntries(formData.entries());

    if (updatedItem) {
      // API'ye güncelleme isteği at
      const res = await fetch(`/api/tickets/${updatedItem._id}`, {
        method: "PUT",
        body: JSON.stringify(ticketData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Ticket'ı güncellerken hata meydana geldi");
      }
    } else {
      // API'ye ekleme isteği at
      const res = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify(ticketData),
        headers: {
          "content-type": "application/json",
        },
      });

      // İstek başarısız olursa hata gönder
      if (!res.ok) {
        throw new Error("Ticket oluşturulurken hata meydana geldi");
      }
    }

    // Başarılı olursa:

    // Anasayfaya yönlendir
    router.push("/");

    // Sayfayı yenile
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-3/4 md:1/2 my-4"
      >
        <h3>{updatedItem ? "Update the Ticket" : "Create a Ticket"}</h3>

        <label>Title</label>
        <input
          defaultValue={updatedItem?.title}
          type="text"
          name="title"
          required
        />

        <label>Description</label>
        <textarea
          defaultValue={updatedItem?.description}
          name="description"
          required
        />

        <label>Category</label>
        <select defaultValue={updatedItem?.category} name="category" required>
          <option>Software Problem</option>
          <option>Hardware Problem</option>
          <option>Connection Problem</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="1"
            value={1}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 1}
          />
          <label htmlFor="1">1</label>

          <input
            id="2"
            value={2}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 2}
          />
          <label htmlFor="2">2</label>

          <input
            id="3"
            value={3}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 3}
          />
          <label htmlFor="3">3</label>

          <input
            id="4"
            value={4}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 4}
          />
          <label htmlFor="4">4</label>

          <input
            id="5"
            value={5}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 5}
          />
          <label htmlFor="5">5</label>
        </div>

        <label>Progress</label>
        <input
          type="range"
          name="progress"
          min={0}
          max={100}
          defaultValue={updatedItem?.progress}
        />

        <label>Status</label>
        <select defaultValue={updatedItem?.status} name="status" required>
          <option>Not Started</option>
          <option>Started</option>
          <option>Completed</option>
        </select>

        <button className="btn mt-5">
          {updatedItem ? "Update the Ticket" : "Create the Ticket"}
        </button>
      </form>
    </div>
  );
};

export default Form;
