// BillingSection.jsx
import React from "react";
import { CreditCard, FileText, Calendar, Plus, Trash2, Bell } from "lucide-react";

/**
 * BillingSection
 * - Tailwind required
 * - Replace placeholder data with real props or API data as needed
 */
export default function BillingSection({
  planName = "Team",
  planRenew = "Sep 14, 2025",
  cards = [
    { brand: "MasterCard", tail: "2222", exp: "12/2040" },
    { brand: "MasterCard", tail: "2222", exp: "12/2040" },
  ],
  invoice = { date: "Dec 24, 2024", amount: "$00", plan: "Team" },
}) {
  return (
    <div className="p-6 min-h-screen bg-[#070707] text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Billing</h1>
          <div className="h-1 mt-3 w-full bg-transparent border-t border-white/6" />
        </div>
        <div className="text-gray-400"><Bell size={18} /></div>
      </div>
      <div className="h-1 mt-3 w-full bg-transparent border-t border-[#2F2F2F]" />
      {/* Sections container */}
      <div className="space-y-6 mt-4">
        {/* Plan */}
        <section>
          <div className="bg-[#1D1D1D] border border-[#464646] rounded-xl p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-md bg-[#1D1D1D]">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-[14px] font-lexend font-medium">Plan</div>
                </div>
              </div>

              <div className="text-sm text-gray-400"> {/* empty - right side of header */} </div>
            </div>

            {/* Plan card */}
            <div className="mt-4 bg-[#1D1D1D] border border-[#464646] rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                 <div className="text-[28px] font-lexend font-semibold">{planName}</div>
                  <div className="px-3 py-1 rounded-md bg-[#2F2F2F] text-[8px] font-semibold font-poppins border border-[#464646]">
                    Current Plan
                  </div>
                 
                </div>
                <div className="text-[10px] font-lexend text-[#999999] mt-1">Billed monthly. Renews on {planRenew}</div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-3 py-1 text-[12px] font-poppins bg-white/6 rounded"
                >
                  Manage Plan
                </button>
                <button
                  type="button"
                  className="px-3 py-1 font-poppins bg-[#FF7C741F] text-xs rounded text-[#F2483E] hover:bg-[#532323] transition"
                >
                  Cancel Plan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <div className="bg-[#1D1D1D] border border-[#464646]  rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-md bg-white/5">
                  <CreditCard size={18} />
                </div>
                <div>
                  <div className="text-[14px] font-lexend font-medium">Payment Method</div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-xs px-3 py-1 bg-white/6 rounded font-poppins hover:bg-white/8 transition"
                >
                  <Plus size={14} /> Add card
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((c, i) => (
                <div key={i} className="bg-[#1D1D1D]  border-[#464646]  border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-white/5">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <div className="text-[12px] font-lexend font-medium">{c.brand} xxxx{c.tail}</div>
                      <div className="text-[10px] font-lexend text-[#999999] mt-1">Expires {c.exp}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 font-poppins bg-[#FF7C741F] text-xs rounded text-[#F2483E] hover:bg-[#532323] transition">Remove Card</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Invoice Information */}
        <section>
          <div className="bg-[#1D1D1D] border border-[#464646]  rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-md bg-white/5">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-[14px] font-lexend font-medium">Invoice Information</div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-[#1D1D1D] border border-[#464646]  rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-[10px] font-lexend text-[#999999] mt-1">Bill Date</div>
                  <div className="mt-2 text-sm font-medium">{invoice.date}</div>
                </div>

                <div>
                  <div className="text-[10px] font-lexend text-[#999999] mt-1">Amount</div>
                  <div className="mt-2 text-sm font-medium">{invoice.amount}</div>
                </div>

                <div>
                  <div className="text-[10px] font-lexend text-[#999999] mt-1">Plan</div>
                  <div className="mt-2 text-sm font-medium">{invoice.plan}</div>
                </div>

               <div className="flex justify-end">
                <div className="flex flex-col items-center space-y-2">
                    <div className="text-[10px] font-lexend text-[#999999]">Invoice</div>
                    <button className="px-3 py-1 text-[12px] font-poppins bg-white/6 rounded">
                    View Invoice
                    </button>
                </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
