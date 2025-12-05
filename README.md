# 🛋️ Shopylx - Premium E-Commerce Furniture Platform

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescript.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2+-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3+-0AC775?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

> **Note**: This project represents approximately 60% of the complete e-commerce platform. We're currently awaiting backend API endpoints for final integration, testing, and deployment. The frontend architecture is fully implemented with advanced state management, animations, and responsive design.

## 🌟 Project Overview

Shopylx is a cutting-edge, full-stack e-commerce platform specializing in premium furniture and home decor. Built with modern web technologies, it offers a seamless shopping experience for customers while providing comprehensive management tools for administrators. The platform features sophisticated animations, responsive design, and robust state management to deliver a premium user experience.

### 🎯 Key Highlights

- **Dual-Panel Architecture**: Separate user-facing storefront and admin management dashboard
- **Advanced Animations**: GSAP and Framer Motion powered interactions
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time State Management**: Redux Toolkit for complex application state
- **Modern UI/UX**: Professional design with attention to detail
- **Scalable Architecture**: Modular components and clean code structure

## 🚀 Features

### 👤 User Panel Features

#### 🏠 Homepage & Navigation

- **Dynamic Header**: Animated background with rotating product categories
- **Smart Navigation**: Responsive navbar with cart/wishlist counters and mobile menu
- **Category Showcase**: Animated category icons with hover effects
- **Exclusive Offers**: Carousel of featured products with smooth scrolling

#### 🛒 Shopping Experience

- **Product Catalog**: Grid layout with advanced filtering and search
- **Product Details**: Comprehensive product pages with image galleries
- **Shopping Cart**: Persistent cart with quantity management and totals
- **Wishlist**: Save favorite items with visual feedback
- **Order Management**: Track order history and status

#### 🎨 User Interface

- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Page transitions and micro-interactions
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton screens and progress indicators

### 👨‍💼 Admin Panel Features

#### 📊 Dashboard Overview

- **Analytics Cards**: Real-time counts for products, orders, categories, users
- **Quick Actions**: Direct access to management sections
- **Responsive Sidebar**: Collapsible navigation with active state indicators

#### 📦 Product Management

- **CRUD Operations**: Create, read, update, delete products
- **Bulk Actions**: Manage multiple products simultaneously
- **Image Upload**: Support for product image galleries
- **Category Assignment**: Organize products by categories
- **Stock Management**: Track inventory levels and availability

#### 📋 Order Management

- **Order Tracking**: View and update order statuses
- **Customer Details**: Access buyer information and order history
- **Status Updates**: Change order states (pending, processing, shipped, delivered)
- **Order Filtering**: Search and filter orders by various criteria

#### 🏷️ Category Management

- **Category CRUD**: Full lifecycle management of product categories
- **Hierarchical Structure**: Support for nested categories
- **Brand Association**: Link categories with specific brands
- **Display Ordering**: Control category presentation order

#### 👥 User Management

- **User Profiles**: View and manage customer accounts
- **Role Assignment**: Admin and user role management
- **Activity Tracking**: Monitor user interactions and purchases

## 🛠️ Technology Stack & Tools

### 🎯 Core Framework

- **Next.js 14+**: React framework with App Router for optimal performance
- **React 18+**: Latest React features including concurrent rendering
- **TypeScript**: Type-safe development with enhanced developer experience

### 🎨 Styling & UI

- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Custom CSS**: Advanced animations and responsive design patterns
- **Poppins Font**: Modern typography for professional appearance

### 🎭 Animations & Interactions

- **Framer Motion**: Declarative animations for React components
- **GSAP (GreenSock Animation Platform)**: High-performance animation library
- **Custom Animation Hooks**: Reusable animation logic and effects

### 🏪 State Management

- **Redux Toolkit**: Modern Redux with simplified setup and best practices
- **Multiple Slices**: Organized state management for different domains:
  - `cartSlice`: Shopping cart functionality
  - `wishlistSlice`: Favorite items management
  - `productSlice`: Product catalog and CRUD operations
  - `orderSlice`: Order processing and tracking
  - `categorySlice`: Category management
  - `adminSlice`: Admin dashboard statistics

### 📡 Data Fetching & API

- **TanStack Query (React Query)**: Powerful data synchronization for server state
- **Axios**: HTTP client for API communications
- **Custom Hooks**: `useProductsQuery`, `useGetDataQuery`, `useAdminDataQuery`

### 🧩 Component Architecture

- **Modular Components**: Reusable UI components organized by feature
- **Custom Hooks**: Business logic separation and reusability
- **Provider Pattern**: Context providers for global state management

### 📱 Responsive Design

- **Mobile-First**: Design approach prioritizing mobile experience
- **Breakpoint System**: Tailwind's responsive utilities
- **Touch Interactions**: Optimized for mobile gestures and touch events

## 🏗️ Project Architecture & Logic

### 📂 Project Structure

```Starcture OF Project
shopylx-ecommerce/
├── app/                          # Next.js App Router
│   ├── (user)/                   # User-facing pages
│   │   ├── page.js              # Homepage
│   │   ├── products/            # Product catalog
│   │   ├── product/[id]/        # Product details
│   │   ├── cart/                # Shopping cart
│   │   ├── wishlist/            # Wishlist page
│   │   ├── orders/              # Order history
│   │   ├── about/               # About page
│   │   ├── contactus/           # Contact page
│   │   └── help/                # Help & FAQ
│   ├── admin/                   # Admin panel
│   │   ├── layout.js            # Admin layout
│   │   ├── page.js              # Dashboard
│   │   ├── productsmanagement/  # Product management
│   │   ├── orders/              # Order management
│   │   ├── categories/          # Category management
│   │   └── editor/              # Content editor
│   ├── components/              # Reusable components
│   │   ├── sections/            # Page sections
│   │   │   ├── Header.jsx       # Hero section
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── CartSection.jsx  # Cart page content
│   │   │   ├── Footer.jsx       # Site footer
│   │   │   └── ...
│   │   ├── features/            # Feature components
│   │   │   ├── ProductCard.jsx  # Product display
│   │   │   ├── MobileMenu.jsx   # Mobile navigation
│   │   │   └── ...
│   │   ├── gsap/                # Animation components
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── GlowPillButton.jsx
│   │   │   └── ...
│   │   ├── admin/               # Admin components
│   │   │   └── AdminSidebar.jsx # Admin navigation
│   │   └── wishlist/            # Wishlist components
│   ├── store/                   # Redux store
│   │   ├── store.js             # Store configuration
│   │   └── slices/              # Redux slices
│   │       ├── cartSlice.js
│   │       ├── wishlistSlice.js
│   │       ├── productSlice.js
│   │       ├── orderSlice.js
│   │       ├── categorySlice.js
│   │       └── adminSlice.js
│   ├── providers/               # Context providers
│   ├── globals.css              # Global styles
│   └── layout.js                # Root layout
├── lib/                         # Utility libraries
│   ├── useProductsQuery.js      # Product data hooks
│   ├── useGetDataQuery.js       # Generic data hooks
│   └── useAdminDataQuery.js     # Admin data hooks
├── public/                      # Static assets
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

### 🔄 State Management Logic

#### Redux Toolkit Implementation

The application uses Redux Toolkit for predictable state management across the entire application. Each feature has its own slice with dedicated reducers and actions.

**Cart Slice Logic:**

```javascript
// app/store/slices/cartSlice.js
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
    },
    // ... other reducers
  }
});
```

**Key State Management Patterns:**

- **Slice Organization**: Each domain (cart, wishlist, products) has isolated state
- **Action Creators**: Typed actions for state mutations
- **Selectors**: Memoized selectors for computed state
- **Middleware**: Redux DevTools integration for debugging

#### Data Flow Architecture

1. **User Interaction** → Component dispatches action
2. **Action** → Reducer updates state immutably
3. **State Update** → Selectors recalculate derived data
4. **Component Re-render** → UI reflects new state
5. **Side Effects** → React Query handles server state synchronization

### 🎨 UI/UX Techniques & Animations

#### Animation Strategy

The platform employs a multi-layered animation approach combining Framer Motion for React-specific animations and GSAP for complex, high-performance animations.

**Framer Motion Usage:**

```jsx
// Smooth page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <PageContent />
</motion.div>
```

**GSAP Implementation:**

```javascript
// Complex button hover effects
const tl = gsap.timeline({ paused: true });
tl.to(circle, { scale: 1.2, duration: 0.7, ease: 'power3.easeOut' })
  .to(label, { y: -(h + 8), duration: 0.7, ease: 'power3.easeOut' }, 0);
```

#### Animation Techniques Employed

- **Micro-interactions**: Button hovers, form feedback, loading states
- **Page Transitions**: Smooth navigation between routes
- **Scroll Animations**: Elements animate into view on scroll
- **Loading States**: Skeleton screens and progress indicators
- **Hover Effects**: Interactive feedback for better UX

#### Responsive Design Patterns

- **Mobile-First CSS**: Base styles for mobile, enhanced for larger screens
- **Flexible Grid System**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Optimized**: Appropriate touch targets and gesture support
- **Performance**: Optimized images and lazy loading

### 🔗 Integration Logic

#### User-Admin Panel Connection

The platform maintains separation between user and admin experiences while sharing core business logic:

- **Shared Components**: Common UI elements with role-based rendering
- **Unified State**: Redux store accessible across panels
- **API Abstraction**: Consistent data fetching patterns
- **Authentication Flow**: Role-based access control (planned for backend integration)

#### API Integration Strategy

Currently using mock APIs (fakestoreapi.com) with planned backend replacement:

```javascript
// lib/useProductsQuery.js
const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

**Planned Backend Integration:**

- RESTful API endpoints for CRUD operations
- Real-time updates with WebSockets
- Authentication and authorization
- Payment processing integration
- Inventory management system

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/shopylx-ecommerce.git
   cd shopylx-ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment setup** (for future backend integration)

   ```bash
   cp .env.example .env.local
   # Add your API endpoints and configuration
   ```

4. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### For Users

1. **Browse Products**: Explore the homepage and product catalog
2. **Add to Cart**: Click "Add" on products or use quick actions
3. **Manage Wishlist**: Save items for later with heart icon
4. **Checkout Process**: Review cart and place orders
5. **Track Orders**: View order history in the orders page

### For Administrators

1. **Access Admin Panel**: Navigate to `/admin`
2. **Dashboard Overview**: Monitor key metrics and recent activity
3. **Manage Products**: Add, edit, or remove products
4. **Process Orders**: Update order statuses and manage fulfillment
5. **Category Management**: Organize products with categories
6. **User Oversight**: Monitor user accounts and activity

## 🔧 Development Techniques

### Code Quality Practices

- **TypeScript**: Type safety for better development experience
- **ESLint**: Code linting and formatting consistency
- **Prettier**: Automated code formatting
- **Component Composition**: Reusable, composable UI components

### Performance Optimization

- **Next.js Optimization**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Webpack bundle analyzer for optimization
- **Caching Strategies**: React Query for intelligent data caching

### Testing Strategy (Planned)

- **Unit Tests**: Jest for component and utility testing
- **Integration Tests**: Testing component interactions
- **E2E Tests**: Playwright for full user journey testing
- **Visual Regression**: Chromatic for UI consistency

## 🤝 Contributing

We welcome contributions to Shopylx! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use descriptive commit messages
- Maintain component documentation
- Ensure responsive design
- Test your changes thoroughly

### Areas for Contribution

- UI/UX improvements
- Performance optimizations
- New features implementation
- Bug fixes and testing
- Documentation updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For hosting and deployment platform
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth React animations
- **GSAP**: For high-performance animations
- **Redux Toolkit**: For simplified state management
- **Fake Store API**: For development data

## 📞 Contact & Support

For questions, suggestions, or support:

- **Email**:support@shopylx.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/shopylx-ecommerce/issues)
- **Documentation**: [Full documentation](https://docs.shopylx.com)

---

**Shopylx** - Crafting digital comfort through innovative e-commerce solutions. 🛋️✨

*This README represents the current state of the project (60% complete). Full functionality will be available upon backend API integration and comprehensive testing.*
