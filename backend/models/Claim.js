export const Claim = {
    id: "uuid PRIMARY KEY DEFAULT gen_random_uuid()",
    influencer_id: "uuid REFERENCES Influencer(id)",
    content: "TEXT NOT NULL",
    category: "TEXT NOT NULL",
    fact_check_status: "TEXT DEFAULT 'pending'",
    source: "TEXT",
    created_at: "TIMESTAMP DEFAULT NOW()",
  };
  