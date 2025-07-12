# Inventory Management App (Stokkia)

A comprehensive inventory management system built with Angular frontend and Spring Boot backend, designed to handle product management, orders, invoices, and customer/supplier relationships.

## 🏗️ Project Architecture

This project follows a modern microservices architecture with separate frontend and backend applications:

```
Inventory Management App/
├── Frontend/          # Angular 17 Application
└── Backend/           # Spring Boot 3 Application
```

## 🛠️ Technology Stack

### Frontend (Angular 17)
- **Framework**: Angular 17.3.0
- **UI Library**: PrimeNG 17.18.11
- **Styling**: PrimeFlex 3.3.1, SCSS
- **Icons**: PrimeIcons 7.0.0, FontAwesome 6.6.0
- **Charts**: Chart.js 4.4.6 with ChartJS Data Labels
- **Internationalization**: ngx-translate 15.0.0, i18next 23.15.2
- **QR/Barcode Scanner**: @zxing/ngx-scanner 18.0.1
- **Testing**: Jasmine, Karma

### Backend (Spring Boot 3)
- **Framework**: Spring Boot 3.3.4
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA with Hibernate
- **API Documentation**: Spring HATEOAS
- **Object Mapping**: MapStruct 1.6.2
- **Build Tool**: Maven
- **Database Migration**: Flyway

## 🚀 Features

### Core Modules

#### 1. Product Management
- Product catalog with categories
- Product details and specifications
- Stock level tracking
- Product images and descriptions
- Category management

#### 2. Customer & Supplier Management
- Customer database management
- Supplier information tracking
- Contact details and addresses
- Customer/supplier relationship management

#### 3. Order Management
- Sales orders (CommandeVente)
- Purchase orders (CommandeAchat)
- Rental orders (CommandeLocation)
- Order history and tracking
- Order summary and details

#### 4. Invoice & Quote System
- Invoice generation and management
- Quote (Devis) creation
- Invoice details and line items
- PDF generation capabilities

#### 5. Shopping Cart & Checkout
- Shopping cart functionality
- Checkout process
- Order processing workflow

#### 6. Dashboard & Analytics
- Real-time dashboard
- Sales analytics and charts
- Inventory reports
- Business metrics visualization

#### 7. User Interface
- Modern responsive design
- Sidebar navigation
- Header with user controls
- Footer with application info
- Configurable layout

## 📁 Project Structure

### Frontend Structure
```
Frontend/src/app/
├── modules/
│   ├── accueil/              # Home page
│   ├── categories/           # Category management
│   ├── Produits/            # Product management
│   ├── personneComponents/   # Customer/Supplier management
│   ├── ordre/               # Order management
│   ├── facture/             # Invoice management
│   ├── PanierComponent/     # Shopping cart
│   ├── checkout/            # Checkout process
│   └── chart/               # Analytics and charts
├── shared/
│   ├── components/          # Reusable components
│   └── dashboard/           # Dashboard components
├── layout/                  # Application layout
└── app.module.ts           # Main application module
```

### Backend Structure
```
Backend/src/main/java/com/strachange/stokkia/
├── produit/                 # Product management
├── categorie/              # Category management
├── client/                 # Customer management
├── fournisseur/            # Supplier management
├── commande/               # Order management
├── commandevente/          # Sales orders
├── commandeachat/          # Purchase orders
├── commandelocation/       # Rental orders
├── detailcommande/         # Order line items
├── facture/                # Invoice management
├── devis/                  # Quote management
├── personne/               # Person management
└── dashboard/              # Dashboard analytics
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17 or higher
- PostgreSQL 12+
- Maven 3.6+

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Inventory management App"
   ```

2. **Configure Database**
   - Install PostgreSQL
   - Create a database named `stokkia`
   - Update database credentials in `Backend/src/main/resources/application.yaml`

3. **Run the Backend**
   ```bash
   cd Backend
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

2. **Run the Frontend**
   ```bash
   npm start
   ```
   The frontend will start on `http://localhost:4200`

## 🔧 Configuration

### Database Configuration
The application uses PostgreSQL with the following default configuration:
- **Host**: localhost:5432
- **Database**: stokkia
- **Username**: postgres
- **Password**: admin

Update these settings in `Backend/src/main/resources/application.yaml`

### File Upload Configuration
- Maximum file size: 2MB
- Maximum request size: 2MB
- Multipart uploads enabled

## 📊 API Endpoints

The backend provides RESTful APIs for:

- **Products**: `/api/produits`
- **Categories**: `/api/categories`
- **Customers**: `/api/clients`
- **Suppliers**: `/api/fournisseurs`
- **Orders**: `/api/commandes`
- **Invoices**: `/api/factures`
- **Quotes**: `/api/devis`
- **Dashboard**: `/api/dashboard`

## 🧪 Testing

### Frontend Testing
```bash
cd Frontend
npm test
```

### Backend Testing
```bash
cd Backend
mvn test
```

## 🐳 Docker Support

The backend includes a Dockerfile for containerization:
```bash
cd Backend
docker build -t stokkia-backend .
docker run -p 8080:8080 stokkia-backend
```

## 📈 Key Features

### Business Features
- **Inventory Tracking**: Real-time stock level monitoring
- **Multi-Order Types**: Sales, purchase, and rental orders
- **Customer Management**: Complete customer lifecycle management
- **Supplier Management**: Supplier relationship and order tracking
- **Financial Management**: Invoice and quote generation
- **Analytics**: Business intelligence and reporting

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Internationalization**: Multi-language support
- **Real-time Updates**: Live dashboard and notifications
- **Data Validation**: Comprehensive input validation
- **Security**: Authentication and authorization
- **Scalability**: Microservices-ready architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Ram Khammessi / Khaled Salhi** - Initial work

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Spring Boot team for the robust backend framework
- PrimeNG team for the beautiful UI components
- PostgreSQL team for the reliable database

---

**Note**: This is a comprehensive inventory management solution suitable for small to medium businesses looking to digitize their inventory and order management processes. 