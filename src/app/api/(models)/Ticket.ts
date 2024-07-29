import mongoose, { Schema } from "mongoose";

// Veritabanına bağlan
mongoose.connect(process.env.MONGODB_URL);

// Asenkron işlemler için ayar
mongoose.Promise = global.Promise;

// Ticket verisi için bir model oluştur
const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: String,
  },
  {
    timestamps: true,
  }
);

// Eğerki daha önce ticket modeli oluşturulduysa yeni bir model oluşturmak yerine daha önce oluşturulanı kullanır daha önce oluştulan bir model yoksa yenisini oluşturur
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
