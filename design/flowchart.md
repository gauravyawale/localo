flowchart TD

subgraph Client["Frontend (Next.js Monorepo)"]
    A1[(Public App - Customer)]
    A2[(Shop Owner Dashboard)]
    A3[(Admin Panel)]
end

subgraph Backend["Backend (Node.js + Express + Apollo)"]
    B1[(REST API)]
    B2[(GraphQL Server)]
    B3[(Auth Service)]
end

subgraph Database["Data & Cache Layer"]
    C1[(PostgreSQL)]
    C2[(Redis)]
end

subgraph External["External Integrations"]
    D1[(Razorpay)]
    D2[(Cloudinary)]
    D3[(WhatsApp/SMS)]
    D4[(Sentry)]
end

A1 <--> B1
A1 <--> B2
A2 <--> B1
A2 <--> B2
A3 <--> B1
A3 <--> B2

B1 --> B3
B3 --> C2
B1 --> C1
B2 --> C1
B1 --> D1
B2 --> D2
B1 --> D3
B1 --> D4

