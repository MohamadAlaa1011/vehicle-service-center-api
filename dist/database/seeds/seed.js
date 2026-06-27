"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const database_config_1 = require("../../config/database.config");
const user_entity_1 = require("../../modules/users/entities/user.entity");
const customer_entity_1 = require("../../modules/customers/entities/customer.entity");
const vehicle_entity_1 = require("../../modules/vehicles/entities/vehicle.entity");
const supplier_entity_1 = require("../../modules/suppliers/entities/supplier.entity");
const spare_part_entity_1 = require("../../modules/spare-parts/entities/spare-part.entity");
const enums_1 = require("../../common/enums");
async function seed() {
    const dataSource = new typeorm_1.DataSource(database_config_1.typeOrmConfig);
    await dataSource.initialize();
    console.log('🌱 Seeding database with comprehensive sample data...');
    const userRepository = dataSource.getRepository(user_entity_1.User);
    const customerRepository = dataSource.getRepository(customer_entity_1.Customer);
    const vehicleRepository = dataSource.getRepository(vehicle_entity_1.Vehicle);
    const supplierRepository = dataSource.getRepository(supplier_entity_1.Supplier);
    const sparePartRepository = dataSource.getRepository(spare_part_entity_1.SparePart);
    console.log('👤 Creating users...');
    const users = [
        {
            fullName: 'System Administrator',
            email: 'admin@vehicleservice.com',
            phone: '+1234567890',
            role: enums_1.UserRole.SUPER_ADMIN,
            status: enums_1.UserStatus.ACTIVE,
        },
        {
            fullName: 'John Manager',
            email: 'manager@vehicleservice.com',
            phone: '+1234567891',
            role: enums_1.UserRole.SERVICE_MANAGER,
            status: enums_1.UserStatus.ACTIVE,
        },
        {
            fullName: 'Alice Receptionist',
            email: 'receptionist@vehicleservice.com',
            phone: '+1234567892',
            role: enums_1.UserRole.RECEPTIONIST,
            status: enums_1.UserStatus.ACTIVE,
        },
        {
            fullName: 'Bob Mechanic',
            email: 'mechanic1@vehicleservice.com',
            phone: '+1234567893',
            role: enums_1.UserRole.MECHANIC,
            status: enums_1.UserStatus.ACTIVE,
        },
        {
            fullName: 'Charlie Mechanic',
            email: 'mechanic2@vehicleservice.com',
            phone: '+1234567894',
            role: enums_1.UserRole.MECHANIC,
            status: enums_1.UserStatus.ACTIVE,
        },
    ];
    const savedUsers = [];
    for (const userData of users) {
        const passwordHash = await bcrypt.hash('Password@123', 12);
        const user = userRepository.create({
            ...userData,
            passwordHash,
        });
        const savedUser = await userRepository.save(user);
        savedUsers.push(savedUser);
        console.log(`✅ User created: ${savedUser.fullName} (${savedUser.role})`);
    }
    console.log('🏭 Creating suppliers...');
    const suppliers = [
        {
            companyName: 'AutoParts Plus',
            contactPerson: 'Mike Johnson',
            phone: '+1555123456',
            email: 'mike@autopartsplus.com',
            address: '789 Industrial Blvd, City, State 12345',
        },
        {
            companyName: 'Premium Auto Supply',
            contactPerson: 'Sarah Wilson',
            phone: '+1555654321',
            email: 'sarah@premiumauto.com',
            address: '456 Commerce Drive, City, State 12345',
        },
        {
            companyName: 'QuickFix Parts',
            contactPerson: 'David Brown',
            phone: '+1555789012',
            email: 'david@quickfixparts.com',
            address: '321 Supply Street, City, State 12345',
        },
    ];
    const savedSuppliers = [];
    for (const supplierData of suppliers) {
        const supplier = supplierRepository.create(supplierData);
        const savedSupplier = await supplierRepository.save(supplier);
        savedSuppliers.push(savedSupplier);
        console.log(`✅ Supplier created: ${savedSupplier.companyName}`);
    }
    console.log('👥 Creating customers...');
    const customers = [
        {
            fullName: 'John Doe',
            phone: '+1987654321',
            email: 'john.doe@example.com',
            address: '123 Main Street, City, State 12345',
            notes: 'Regular customer, prefers morning appointments',
        },
        {
            fullName: 'Jane Smith',
            phone: '+1987654322',
            email: 'jane.smith@example.com',
            address: '456 Oak Avenue, City, State 12345',
            notes: 'Drives a lot for work, frequent oil changes',
        },
        {
            fullName: 'Robert Johnson',
            phone: '+1987654323',
            email: 'robert.johnson@example.com',
            address: '789 Pine Road, City, State 12345',
            notes: 'Owns multiple vehicles',
        },
        {
            fullName: 'Emily Davis',
            phone: '+1987654324',
            email: 'emily.davis@example.com',
            address: '321 Elm Street, City, State 12345',
            notes: 'Very punctual, values quality service',
        },
        {
            fullName: 'Michael Brown',
            phone: '+1987654325',
            email: 'michael.brown@example.com',
            address: '654 Maple Drive, City, State 12345',
            notes: 'Fleet manager, multiple company vehicles',
        },
    ];
    const savedCustomers = [];
    for (const customerData of customers) {
        const customer = customerRepository.create(customerData);
        const savedCustomer = await customerRepository.save(customer);
        savedCustomers.push(savedCustomer);
        console.log(`✅ Customer created: ${savedCustomer.fullName}`);
    }
    console.log('🚗 Creating vehicles...');
    const vehicles = [
        {
            customerId: savedCustomers[0].id,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            color: 'Silver',
            plateNumber: 'ABC123',
            vinNumber: '1HGCM82633A123456',
            mileage: 45000,
            fuelType: enums_1.FuelType.GASOLINE,
        },
        {
            customerId: savedCustomers[1].id,
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            color: 'Blue',
            plateNumber: 'DEF456',
            vinNumber: '2HGFC2F59JH123457',
            mileage: 62000,
            fuelType: enums_1.FuelType.GASOLINE,
        },
        {
            customerId: savedCustomers[2].id,
            make: 'Ford',
            model: 'F-150',
            year: 2021,
            color: 'Red',
            plateNumber: 'GHI789',
            vinNumber: '1FTFW1ET5DFC12345',
            mileage: 28000,
            fuelType: enums_1.FuelType.GASOLINE,
        },
        {
            customerId: savedCustomers[2].id,
            make: 'Tesla',
            model: 'Model 3',
            year: 2022,
            color: 'White',
            plateNumber: 'JKL012',
            vinNumber: '5YJ3E1EA4JF123456',
            mileage: 15000,
            fuelType: enums_1.FuelType.ELECTRIC,
        },
        {
            customerId: savedCustomers[3].id,
            make: 'BMW',
            model: 'X5',
            year: 2020,
            color: 'Black',
            plateNumber: 'MNO345',
            vinNumber: '5UXCR6C0XL9123456',
            mileage: 35000,
            fuelType: enums_1.FuelType.GASOLINE,
        },
        {
            customerId: savedCustomers[4].id,
            make: 'Chevrolet',
            model: 'Silverado',
            year: 2021,
            color: 'Gray',
            plateNumber: 'PQR678',
            vinNumber: '1GCUYGEL5MZ123456',
            mileage: 42000,
            fuelType: enums_1.FuelType.DIESEL,
        },
        {
            customerId: savedCustomers[4].id,
            make: 'Ford',
            model: 'Transit',
            year: 2020,
            color: 'White',
            plateNumber: 'STU901',
            vinNumber: 'WM21XXX0XLG123456',
            mileage: 78000,
            fuelType: enums_1.FuelType.DIESEL,
        },
    ];
    const savedVehicles = [];
    for (const vehicleData of vehicles) {
        const vehicle = vehicleRepository.create(vehicleData);
        const savedVehicle = await vehicleRepository.save(vehicle);
        savedVehicles.push(savedVehicle);
        console.log(`✅ Vehicle created: ${savedVehicle.make} ${savedVehicle.model} (${savedVehicle.plateNumber})`);
    }
    console.log('🔧 Creating spare parts inventory...');
    const spareParts = [
        {
            sku: 'ENG001',
            name: 'Oil Filter - Standard',
            category: 'Engine',
            description: 'High-quality oil filter for regular maintenance',
            quantity: 100,
            minimumStock: 20,
            purchasePrice: 8.99,
            sellingPrice: 15.99,
            supplierId: savedSuppliers[0].id,
        },
        {
            sku: 'ENG002',
            name: 'Air Filter',
            category: 'Engine',
            description: 'Premium air filter for optimal engine performance',
            quantity: 75,
            minimumStock: 15,
            purchasePrice: 12.99,
            sellingPrice: 22.99,
            supplierId: savedSuppliers[0].id,
        },
        {
            sku: 'ENG003',
            name: 'Spark Plugs Set',
            category: 'Engine',
            description: 'Platinum spark plugs set of 4',
            quantity: 25,
            minimumStock: 5,
            purchasePrice: 35.99,
            sellingPrice: 59.99,
            supplierId: savedSuppliers[1].id,
        },
        {
            sku: 'ENG004',
            name: 'Engine Oil 5W-30',
            category: 'Engine',
            description: 'Full synthetic motor oil 5 quart',
            quantity: 60,
            minimumStock: 12,
            purchasePrice: 24.99,
            sellingPrice: 39.99,
            supplierId: savedSuppliers[0].id,
        },
        {
            sku: 'BRK001',
            name: 'Brake Pads - Front',
            category: 'Brakes',
            description: 'Premium ceramic brake pads for front wheels',
            quantity: 50,
            minimumStock: 10,
            purchasePrice: 45.99,
            sellingPrice: 79.99,
            supplierId: savedSuppliers[1].id,
        },
        {
            sku: 'BRK002',
            name: 'Brake Pads - Rear',
            category: 'Brakes',
            description: 'Premium ceramic brake pads for rear wheels',
            quantity: 45,
            minimumStock: 10,
            purchasePrice: 39.99,
            sellingPrice: 69.99,
            supplierId: savedSuppliers[1].id,
        },
        {
            sku: 'BRK003',
            name: 'Brake Rotors - Front Pair',
            category: 'Brakes',
            description: 'Ventilated brake rotors front pair',
            quantity: 20,
            minimumStock: 4,
            purchasePrice: 89.99,
            sellingPrice: 149.99,
            supplierId: savedSuppliers[1].id,
        },
        {
            sku: 'BRK004',
            name: 'Brake Fluid DOT 4',
            category: 'Brakes',
            description: 'High performance brake fluid 1L',
            quantity: 30,
            minimumStock: 6,
            purchasePrice: 8.99,
            sellingPrice: 16.99,
            supplierId: savedSuppliers[0].id,
        },
        {
            sku: 'TRN001',
            name: 'Transmission Filter',
            category: 'Transmission',
            description: 'Automatic transmission filter kit',
            quantity: 25,
            minimumStock: 5,
            purchasePrice: 22.99,
            sellingPrice: 39.99,
            supplierId: savedSuppliers[2].id,
        },
        {
            sku: 'TRN002',
            name: 'Transmission Fluid ATF',
            category: 'Transmission',
            description: 'Automatic transmission fluid 1 quart',
            quantity: 40,
            minimumStock: 8,
            purchasePrice: 9.99,
            sellingPrice: 17.99,
            supplierId: savedSuppliers[2].id,
        },
        {
            sku: 'SUS001',
            name: 'Shock Absorbers - Front Pair',
            category: 'Suspension',
            description: 'Premium gas-filled shock absorbers',
            quantity: 15,
            minimumStock: 3,
            purchasePrice: 120.99,
            sellingPrice: 199.99,
            supplierId: savedSuppliers[1].id,
        },
        {
            sku: 'SUS002',
            name: 'Strut Assembly - Front',
            category: 'Suspension',
            description: 'Complete strut assembly with spring',
            quantity: 12,
            minimumStock: 2,
            purchasePrice: 149.99,
            sellingPrice: 249.99,
            supplierId: savedSuppliers[1].id,
        },
        {
            sku: 'ELC001',
            name: 'Car Battery 12V',
            category: 'Electrical',
            description: 'Maintenance-free car battery 650CCA',
            quantity: 18,
            minimumStock: 3,
            purchasePrice: 79.99,
            sellingPrice: 129.99,
            supplierId: savedSuppliers[2].id,
        },
        {
            sku: 'ELC002',
            name: 'Alternator Belt',
            category: 'Electrical',
            description: 'Serpentine belt for alternator drive',
            quantity: 35,
            minimumStock: 7,
            purchasePrice: 15.99,
            sellingPrice: 27.99,
            supplierId: savedSuppliers[0].id,
        },
        {
            sku: 'COL001',
            name: 'Radiator Coolant',
            category: 'Cooling',
            description: 'Universal antifreeze coolant 1 gallon',
            quantity: 40,
            minimumStock: 8,
            purchasePrice: 12.99,
            sellingPrice: 22.99,
            supplierId: savedSuppliers[0].id,
        },
        {
            sku: 'COL002',
            name: 'Water Pump',
            category: 'Cooling',
            description: 'Engine water pump assembly',
            quantity: 10,
            minimumStock: 2,
            purchasePrice: 65.99,
            sellingPrice: 109.99,
            supplierId: savedSuppliers[2].id,
        },
        {
            sku: 'TIR001',
            name: 'All-Season Tire 225/60R16',
            category: 'Tires',
            description: 'Premium all-season radial tire',
            quantity: 32,
            minimumStock: 8,
            purchasePrice: 89.99,
            sellingPrice: 149.99,
            supplierId: savedSuppliers[1].id,
        },
        {
            sku: 'TIR002',
            name: 'Wheel Alignment Kit',
            category: 'Tires',
            description: 'Professional wheel alignment hardware',
            quantity: 5,
            minimumStock: 1,
            purchasePrice: 25.99,
            sellingPrice: 45.99,
            supplierId: savedSuppliers[2].id,
        },
        {
            sku: 'LOW001',
            name: 'Cabin Air Filter',
            category: 'Interior',
            description: 'HEPA cabin air filter replacement',
            quantity: 3,
            minimumStock: 8,
            purchasePrice: 16.99,
            sellingPrice: 29.99,
            supplierId: savedSuppliers[0].id,
        },
        {
            sku: 'LOW002',
            name: 'Windshield Wipers - Pair',
            category: 'Exterior',
            description: 'All-weather windshield wiper blades',
            quantity: 5,
            minimumStock: 10,
            purchasePrice: 19.99,
            sellingPrice: 34.99,
            supplierId: savedSuppliers[2].id,
        },
    ];
    for (const partData of spareParts) {
        const part = sparePartRepository.create(partData);
        await sparePartRepository.save(part);
    }
    console.log(`✅ Created ${spareParts.length} spare parts in inventory`);
    console.log('\n📊 Seeding Summary:');
    console.log(`👤 Users: ${users.length} (1 Admin, 1 Manager, 1 Receptionist, 2 Mechanics)`);
    console.log(`🏭 Suppliers: ${suppliers.length}`);
    console.log(`👥 Customers: ${customers.length}`);
    console.log(`🚗 Vehicles: ${vehicles.length}`);
    console.log(`🔧 Spare Parts: ${spareParts.length} (across 8 categories)`);
    console.log('\n🔑 Login Credentials:');
    console.log('📧 Email: admin@vehicleservice.com');
    console.log('🔒 Password: Password@123');
    await dataSource.destroy();
    console.log('\n🎉 Database seeding completed successfully!');
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map