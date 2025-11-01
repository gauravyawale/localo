1. **Guest Add to Cart**:
sequenceDiagram
    autonumber
    participant User as 👤 Guest User
    participant FE as 🖥️ Frontend (Next.js)
    participant BE as ⚙️ Backend (Express API)
    participant DB as 🗄️ PostgreSQL
    participant Redis as 🧠 Redis (Cart Cache)
    participant Shop as 🏪 Shop Owner
    participant Admin as 👨‍💼 Admin System

    User->>FE: Click "Add to Cart"
    FE->>FE: Validate local stock & price
    alt No guestSessionId cookie
        FE->>BE: GET /api/guest-session
        BE->>Redis: Create guestSessionId (TTL 24h)
        Redis-->>BE: OK
        BE-->>FE: Set-Cookie: guestSessionId
    end

    FE->>BE: POST /api/cart/guest/add { productId, qty, price, discount }
    BE->>DB: Fetch product details by productId
    DB-->>BE: Product data
    BE->>BE: Validate price & stock
    BE->>Redis: Save/Update cart:guest:<sessionId> with product data
    Redis-->>BE: OK
    BE-->>FE: 200 OK { cartSummary, updatedItem }

    par Async Events
        BE-->>Shop: Notify new cart activity (optional)
        BE-->>Admin: Log "guest_cart_add" event
    end

    FE->>FE: Update Zustand store (cart count)
    FE-->>User: Show toast "Item added to cart successfully"

2. **Guest Login / Signup → Cart Merge**:
sequenceDiagram
    autonumber
    participant User as 👤 Guest/User
    participant FE as 🖥️ Frontend (Next.js)
    participant Auth as 🔐 Auth Service
    participant Cart as 🛒 Cart Service
    participant Redis as 🧠 Redis (Guest Cart)
    participant DB as 🗄️ PostgreSQL (User Cart)

    User->>FE: Submit Login / Signup form
    FE->>Auth: POST /api/auth/login { email, password }
    Auth->>Auth: Validate credentials
    Auth-->>FE: 200 OK { tokens, userInfo }

    FE->>FE: Save tokens to cookies
    FE->>Cart: POST /api/cart/merge { guestSessionId }
    Cart->>Redis: Get cart:guest:<sessionId>
    Redis-->>Cart: Guest cart items
    Cart->>DB: Fetch user cart
    DB-->>Cart: User cart items
    Cart->>Cart: Merge guest + user cart
    Cart->>DB: Save merged cart
    DB-->>Cart: OK
    Cart->>Redis: Delete guest cart
    Redis-->>Cart: OK
    Cart-->>FE: 200 OK { cartSummary }
    FE->>FE: Update Zustand store (merged cart)
    FE-->>User: Show "Cart merged successfully" toast

3. **Add to Cart (Logged-In User)**:
sequenceDiagram
    autonumber
    participant User as 👤 User
    participant FE as 🖥️ Frontend (Next.js)
    participant BE as ⚙️ Cart Service
    participant DB as 🗄️ PostgreSQL
    participant Redis as 🧠 Redis (Cache)
    participant Shop as 🏪 Shop Owner
    participant Admin as 👨‍💼 Admin System

    User->>FE: Click "Add to Cart"
    FE->>FE: Validate stock & product status
    FE->>BE: POST /api/cart/add { productId, qty } (with accessToken)
    BE->>BE: Verify JWT → get userId
    BE->>DB: Fetch product details
    DB-->>BE: Product info
    BE->>BE: Validate price & stock
    alt Product already in cart
        BE->>DB: UPDATE cart SET qty = qty + newQty WHERE userId & productId
    else New product
        BE->>DB: INSERT INTO cart (userId, productId, qty, price, shopId)
    end
    BE->>Redis: Cache updated cart (optional)
    Redis-->>BE: OK
    BE-->>FE: 200 OK { updatedItem, cartSummary }

    par Async
        BE-->>Shop: Notify "Product added to cart"
        BE-->>Admin: Log "cart_item_added"
    end

    FE->>FE: Update Zustand store (cart state)
    FE-->>User: Show toast "Item added to cart"

4. **Guest → Signup → Login Flow**:
sequenceDiagram
    autonumber
    participant Guest as 🧍 Guest
    participant FE as 🖥️ Frontend
    participant Auth as 🔐 Auth Service
    participant DB as 🗄️ PostgreSQL
    participant Redis as 🧠 Redis (OTP)
    participant Notif as 📢 Notification Service

    Guest->>FE: Fill signup form (email/mobile)
    FE->>Auth: POST /auth/send-otp
    Auth->>Redis: store OTP (5 min expiry)
    Auth-->>Notif: Send OTP (Email/SMS)
    FE-->>Guest: Show "Enter OTP" screen
    Guest->>FE: Submit OTP + password
    FE->>Auth: POST /auth/verify-otp
    Auth->>Redis: Validate OTP
    Auth->>DB: Create user record
    Auth-->>FE: 200 OK (set access + refresh tokens)
    FE->>FE: Update Zustand → Authenticated
    FE-->>Guest: Redirect to /

5. **Guest Logs In**:
sequenceDiagram
    autonumber
    participant Guest as 🧍 Guest
    participant FE as 🖥️ Frontend
    participant Auth as 🔐 Auth Service
    participant Cart as 🛒 Cart Service
    participant Redis as 🧠 Redis
    participant DB as 🗄️ PostgreSQL

    Guest->>FE: Click "Login"
    FE->>Auth: POST /auth/login { email, password }
    Auth->>DB: Validate user
    Auth-->>FE: 200 OK (tokens + user data)
    FE->>Redis: Check guest cart exists?
    alt cart exists
        Redis->>Cart: Merge guest cart with DB cart
        Cart->>DB: UPSERT merged cart items
        Redis-->>FE: Clear guest cart
    end
    FE->>FE: Update Zustand (auth + merged cart)
    FE-->>Guest: Redirect to homepage

6. **Update / Remove Items from Cart**:
sequenceDiagram
    autonumber
    participant User as 👤 User
    participant FE as 🖥️ Frontend
    participant BE as ⚙️ Cart Service
    participant DB as 🗄️ PostgreSQL

    User->>FE: Increase qty (+) or remove item
    FE->>BE: PATCH /cart/update { productId, qty }
    BE->>DB: Validate stock → Update qty or delete record
    DB-->>BE: Updated cart state
    BE-->>FE: Updated cart summary
    FE->>FE: Update Zustand (cart UI)
    FE-->>User: Reflect updated totals

7. **Checkout Flow (COD + Online Pay)**:
sequenceDiagram
    autonumber
    participant User as 👤 User
    participant FE as 🖥️ Frontend
    participant Cart as 🛒 Cart Service
    participant Pay as 💳 Payment Service
    participant DB as 🗄️ PostgreSQL
    participant Redis as 🧠 Redis
    participant Notif as 📢 Notification Service

    User->>FE: Click "Proceed to Checkout"
    FE->>Cart: GET /cart/summary
    Cart->>DB: Fetch and validate stock
    DB-->>Cart: Validated items
    Cart-->>FE: Summary + total
    FE->>User: Show payment options (COD / Online)

    alt COD
        FE->>Cart: POST /order/create { mode: COD }
        Cart->>DB: Create order record (status=pending)
        DB-->>Cart: OrderId
        Cart-->>FE: Confirm order
        FE->>Notif: Send "Order placed" notification
    else Online
        FE->>Pay: POST /payment/create { orderId, amount }
        Pay->>Razorpay: Create payment order
        Razorpay-->>Pay: paymentOrderId
        FE-->>User: Redirect to Razorpay widget
        User->>Razorpay: Complete payment
        Razorpay-->>Pay: Payment success
        Pay->>DB: Update order status = paid
        Pay-->>Notif: Notify shop + user
        Pay-->>FE: Confirm order success
    end

8. **Delivery Flow (Post-Order)**:
sequenceDiagram
    autonumber
    participant Shop as 🏪 Shop Owner
    participant Admin as 👨‍💼 Admin
    participant FE as 🖥️ Frontend (Shop Dashboard)
    participant Order as 📦 Order Service
    participant DB as 🗄️ PostgreSQL
    participant Notif as 📢 Notification Service

    FE->>Order: GET /orders (shopId)
    Order->>DB: Fetch shop orders
    DB-->>Order: Orders list
    FE-->>Shop: Show dashboard
    Shop->>FE: Update status → Out for Delivery
    FE->>Order: PATCH /delivery/update { orderId, status }
    Order->>DB: Update delivery table
    DB-->>Order: OK
    Order-->>Notif: Send customer delivery status
    Notif-->>Admin: Log delivery update

9. **Logout Flow**:
sequenceDiagram
    autonumber
    participant User as 👤 User
    participant FE as 🖥️ Frontend
    participant Auth as 🔐 Auth Service

    User->>FE: Click Logout
    FE->>Auth: POST /auth/logout
    Auth->>Auth: Invalidate refresh token
    Auth-->>FE: Clear HttpOnly cookies
    FE->>FE: Reset Zustand state (auth + cart)
    FE-->>User: Redirect to homepage
