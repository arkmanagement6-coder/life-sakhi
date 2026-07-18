/**
 * Life Changing Educational & Charitable Trust - Database Schema
 * Reference models for 38 Firestore Collections (Enterprise level data model)
 */

export interface BaseDocument {
  id?: string;
  createdAt: string;
  updatedAt: string;
}

// 1. users
export interface UserDoc extends BaseDocument {
  uid: string;
  email: string;
  displayName: string;
  phone: string;
  role: 'admin' | 'volunteer' | 'donor' | 'women_distributor' | 'district_coordinator' | 'block_coordinator' | 'state_coordinator' | 'csr_partner' | 'corporate_partner' | 'hiring_partner' | 'hospital' | 'school' | 'ngo_partner' | 'doctor' | 'user';
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
  profileImageUrl?: string;
  address?: string;
}

// 2. volunteers
export interface VolunteerDoc extends BaseDocument {
  userId: string;
  skills: string[];
  availability: 'weekdays' | 'weekends' | 'flexible';
  preferredPrograms: ('health' | 'education' | 'employment' | 'campaigns')[];
  experienceYears?: number;
  approvedBy?: string;
}

// 3. donors
export interface DonorDoc extends BaseDocument {
  userId: string;
  donorType: 'individual' | 'corporate' | 'anonymous';
  taxExemptRequested: boolean; // 80G certificate required
  panNumber?: string;
  totalDonationsCount: number;
  totalDonatedAmount: number;
}

// 4. women_distributors
export interface WomenDistributorDoc extends BaseDocument {
  userId: string;
  assignedArea: string;
  blockCoordinatorId: string;
  districtCoordinatorId: string;
  stockPadsOnHand: number;
  salesCount: number;
  earningsAccumulated: number;
  trainingCompleted: boolean;
}

// 5. district_coordinators
export interface DistrictCoordinatorDoc extends BaseDocument {
  userId: string;
  district: string;
  state: string;
  stateCoordinatorId: string;
  activeDistributorsCount: number;
  reportsSubmitted: number;
}

// 6. state_coordinators
export interface StateCoordinatorDoc extends BaseDocument {
  userId: string;
  state: string;
  activeDistrictsCount: number;
  managedCoordinatorIds: string[];
}

// 7. health_programs
export interface HealthProgramDoc extends BaseDocument {
  title: string;
  description: string;
  coordinatorId: string;
  location: string;
  beneficiariesCount: number;
  status: 'active' | 'completed' | 'planned';
}

// 8. education_programs
export interface EducationProgramDoc extends BaseDocument {
  title: string;
  description: string;
  targetAgeGroup: string;
  schoolPartnersCount: number;
  scholarshipsDisbursed: number;
}

// 9. employment_programs
export interface EmploymentProgramDoc extends BaseDocument {
  title: string;
  description: string;
  trainingModulesCount: number;
  womenEmployedCount: number;
  averageIncomeGenerated: number;
}

// 10. projects
export interface ProjectDoc extends BaseDocument {
  title: string;
  description: string;
  status: 'running' | 'upcoming' | 'completed';
  fundsRequired: number;
  fundsRaised: number;
  imageUrls: string[];
  impactSummary: string;
}

// 11. campaigns
export interface CampaignDoc extends BaseDocument {
  title: string;
  description: string;
  category: 'women_health' | 'education' | 'blood_donation' | 'tree_plantation' | 'food_distribution' | 'cloth_distribution' | 'emergency_relief';
  startDate: string;
  endDate: string;
  goalAmount?: number;
  raisedAmount?: number;
  volunteersRegistered: number;
}

// 12. events
export interface EventDoc extends BaseDocument {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  maxAttendees?: number;
  registeredAttendeesCount: number;
}

// 13. blogs
export interface BlogDoc extends BaseDocument {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  coverImage: string;
  tags: string[];
  viewsCount: number;
  published: boolean;
}

// 14. news
export interface NewsDoc extends BaseDocument {
  title: string;
  content: string;
  source: string;
  publishDate: string;
  imageUrl?: string;
  category: string;
}

// 15. gallery
export interface GalleryDoc extends BaseDocument {
  title: string;
  url: string;
  type: 'image' | 'video';
  category: 'campaign' | 'health_camp' | 'education' | 'women_distributors' | 'general';
}

// 16. testimonials
export interface TestimonialDoc extends BaseDocument {
  name: string;
  role: 'Woman Beneficiary' | 'Doctor' | 'Volunteer' | 'Donor' | 'CSR Partner';
  content: string;
  rating: number;
  imageUrl?: string;
}

// 17. partners
export interface PartnerDoc extends BaseDocument {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  partnershipType: 'corporate' | 'ngo' | 'academic' | 'medical';
}

// 18. csr_partners
export interface CsrPartnerDoc extends BaseDocument {
  userId: string;
  companyName: string;
  industry: string;
  csrBudgetAllocated: number;
  sponsoredProjectIds: string[];
  contactPerson: string;
}

// 19. schools
export interface SchoolDoc extends BaseDocument {
  name: string;
  address: string;
  principalName: string;
  contactNumber: string;
  studentsSupportedCount: number;
}

// 20. hospitals
export interface HospitalDoc extends BaseDocument {
  name: string;
  address: string;
  associatedDoctorsCount: number;
  campsHostedCount: number;
  emergencyContact: string;
}

// 21. applications
export interface ApplicationDoc extends BaseDocument {
  userId: string;
  applicantName: string;
  email: string;
  phone: string;
  type: 'volunteer' | 'partner' | 'district_coordinator' | 'block_coordinator' | 'state_coordinator' | 'women_distributor' | 'ngo_partner';
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  cvUrl?: string;
  motivationStatement: string;
  experienceDetails?: string;
}

// 22. notifications
export interface NotificationDoc extends BaseDocument {
  recipientId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'alert' | 'update' | 'transaction' | 'system';
}

// 23. donations
export interface DonationDoc extends BaseDocument {
  donorId?: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  currency: string;
  paymentGateway: 'razorpay' | 'stripe' | 'manual';
  paymentStatus: 'pending' | 'completed' | 'failed';
  programCategory: 'general' | 'education' | 'girl_child' | 'healthcare' | 'csr' | 'monthly' | 'emergency';
  transactionId: string;
  taxExemptReceiptRequested: boolean;
  receiptNumber?: string;
}

// 24. transactions
export interface TransactionDoc extends BaseDocument {
  type: 'credit' | 'debit';
  amount: number;
  category: 'donation' | 'pad_sales' | 'operational_expense' | 'program_expense' | 'salary';
  description: string;
  referenceId: string; // matches donationId, orderId, etc.
}

// 25. sanitary_orders
export interface SanitaryOrderDoc extends BaseDocument {
  distributorId: string;
  coordinatorId: string;
  quantityBoxes: number;
  totalPrice: number;
  status: 'ordered' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  paymentStatus: 'paid' | 'pending';
}

// 26. lifesakhi_distributors
export interface LifeSakhiDistributorDoc extends BaseDocument {
  distributorId: string;
  totalPadsDistributed: number;
  earningsPaid: number;
  activeShgName?: string; // Self Help Group Name
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

// 27. training_materials
export interface TrainingMaterialDoc extends BaseDocument {
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link';
  fileUrl: string;
  category: 'health_hygiene' | 'micro_business' | 'digital_literacy' | 'coordination';
}

// 28. reports
export interface ReportDoc extends BaseDocument {
  title: string;
  type: 'annual' | 'impact' | 'financial' | 'monthly_district';
  fileUrl: string;
  year: number;
  submittedBy?: string;
}

// 29. documents
export interface DocumentDoc extends BaseDocument {
  title: string;
  category: '80G' | '12A' | 'CSR_certificate' | 'trust_deed' | 'audit_report';
  fileUrl: string;
  validFrom?: string;
  validTo?: string;
}

// 30. contact_queries
export interface ContactQueryDoc extends BaseDocument {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  repliedBy?: string;
}

// 31. feedback
export interface FeedbackDoc extends BaseDocument {
  name?: string;
  email?: string;
  role: string;
  rating: number;
  comment: string;
  approvedForTestimonials: boolean;
}

// 32. complaints
export interface ComplaintDoc extends BaseDocument {
  ticketNumber: string;
  reporterName: string;
  email: string;
  phone: string;
  category: 'hygiene_pads' | 'coordinator_conduct' | 'donation_receipt' | 'other';
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  resolutionNotes?: string;
}

// 33. newsletter
export interface NewsletterDoc extends BaseDocument {
  email: string;
  active: boolean;
}

// 34. settings
export interface SettingsDoc extends BaseDocument {
  key: string;
  value: any;
  description?: string;
}

// 35. languages
export interface LanguageDoc extends BaseDocument {
  code: string; // en, hi, bn, gu, etc.
  name: string; // English, Hindi, Bengali, Gujarati
  active: boolean;
}

// 36. roles
export interface RoleDoc extends BaseDocument {
  roleName: string;
  description: string;
  permissionIds: string[];
}

// 37. permissions
export interface PermissionDoc extends BaseDocument {
  actionName: string; // e.g. "view_dashboard", "manage_users", "approve_donations"
  module: string; // e.g. "inventory", "donations", "users"
}

// 38. audit_logs
export interface AuditLogDoc extends BaseDocument {
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress?: string;
}
