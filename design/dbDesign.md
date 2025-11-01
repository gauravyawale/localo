erDiagram

    %% ======================
    %% USER & RELATED TABLES
    %% ======================

    User {
        UUID id PK
        string name
        string email
        string password
        string mobile
        string profilePhoto
        boolean isVerified
        enum role
        date createdAt
        date updatedAt
    }

    Address {
        UUID id PK
        UUID userId FK
        string label
        string street
        string city
        string state
        string pincode
        string country
        boolean isDefault
    }

    Guest {
        UUID id PK
        string ipAddress
        date createdAt
        date expiresAt
    }

    Notification {
        UUID id PK
        UUID userId FK
        enum type
        string message
        boolean isRead
        date createdAt
    }

    Wishlist {
        UUID id PK
        UUID userId FK
        UUID productId FK
        date createdAt
    }

    ShopFollowers {
        UUID id PK
        UUID userId FK
        UUID shopId FK
        date followedAt
    }

    %% ======================
    %% SHOP & PRODUCT
    %% ======================

    Shop {
        UUID id PK
        UUID ownerId FK
        string name
        string bannerImage
        string profilePhoto
        string description
        string address
        string registrationId
        string registrationCertificate
        string pan
        string gstNumber
        enum category
        number discount
        boolean isVerified
        enum status
        date createdAt
    }

    Product {
        UUID id PK
        UUID shopId FK
        string name
        string[] images
        string description
        string category
        number price
        number discount
        number gstPercent
        number quantityAvailable
        enum unit
        enum status
        date createdAt
    }

    Review {
        UUID id PK
        UUID userId FK
        UUID productId FK
        number rating
        string comment
        date createdAt
    }

    %% ======================
    %% CART & ORDER
    %% ======================

    Cart {
        UUID id PK
        UUID userId FK
        UUID shopId FK
        UUID productId FK
        number quantity
        date addedAt
    }

    Order {
        UUID id PK
        string orderNumber
        UUID userId FK
        UUID shopId FK
        number totalAmount
        number discount
        enum status
        enum mode
        string paymentId
        date createdAt
        date updatedAt
    }

    OrderItems {
        UUID id PK
        UUID orderId FK
        UUID productId FK
        number quantity
        number price
        number gst
        number discount
    }

    Delivery {
        UUID id PK
        UUID orderId FK
        string deliveryPartner
        string trackingId
        enum status
        date shippedAt
        date deliveredAt
    }

    %% ======================
    %% RELATIONSHIPS
    %% ======================

    User ||--o{ Address : has
    User ||--o{ Notification : receives
    User ||--o{ Cart : adds
    User ||--o{ Order : places
    User ||--o{ Review : writes
    User ||--o{ Shop : owns
    User ||--o{ Wishlist : saves
    User ||--o{ ShopFollowers : follows

    Shop ||--o{ Product : sells
    Shop ||--o{ Order : receives
    Shop ||--o{ ShopFollowers : followed_by

    Product ||--o{ Cart : included_in
    Product ||--o{ OrderItems : ordered_as
    Product ||--o{ Review : reviewed_by
    Product ||--o{ Wishlist : bookmarked_by

    Order ||--o{ OrderItems : contains
    Order ||--|| Delivery : has
