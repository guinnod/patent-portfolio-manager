
import { Patent, PatentType, PatentStatus, User } from "@/types";

// Mock data for patents
const mockPatents: Patent[] = [
  {
    id: "1",
    name: "TradeMarkX",
    registrationDate: "13/05/2024",
    uid: "QP-8745-ABCD-2024",
    status: PatentStatus.APPROVED,
    type: PatentType.TRADEMARK,
    createdAt: "2024-05-13T10:00:00Z",
    updatedAt: "2024-05-13T10:00:00Z"
  },
  {
    id: "2",
    name: "NeuroScan",
    registrationDate: "22/05/2024",
    uid: "ALG-1524-XZ98-2024",
    status: PatentStatus.APPROVED,
    type: PatentType.PATENT,
    createdAt: "2024-05-22T10:00:00Z",
    updatedAt: "2024-05-22T10:00:00Z"
  },
  {
    id: "3",
    name: "SafeSign",
    registrationDate: "30/06/2024",
    uid: "PD-9032-KLMN-2024",
    status: PatentStatus.PENDING,
    type: PatentType.COPYRIGHT,
    createdAt: "2024-06-30T10:00:00Z",
    updatedAt: "2024-06-30T10:00:00Z"
  },
  {
    id: "4",
    name: "EcoPack",
    registrationDate: "05/08/2024",
    uid: "TM-4785-YTGH-2024",
    status: PatentStatus.APPROVED,
    type: PatentType.TRADEMARK,
    createdAt: "2024-08-05T10:00:00Z",
    updatedAt: "2024-08-05T10:00:00Z"
  },
  {
    id: "5",
    name: "Qamqor AI",
    registrationDate: "26/10/2024",
    uid: "IP-6293-WQER-2024",
    status: PatentStatus.PENDING,
    type: PatentType.PATENT,
    createdAt: "2024-10-26T10:00:00Z",
    updatedAt: "2024-10-26T10:00:00Z"
  },
  {
    id: "6",
    name: "AutoSecure",
    registrationDate: "06/05/2025",
    uid: "DS-8137-MNZX-2025",
    status: PatentStatus.REJECTED,
    type: PatentType.PATENT,
    createdAt: "2025-05-06T10:00:00Z",
    updatedAt: "2025-05-06T10:00:00Z"
  },
  {
    id: "7",
    name: "VisionTrack",
    registrationDate: "13/01/2025",
    uid: "PT-5420-LKJH-2025",
    status: PatentStatus.APPROVED,
    type: PatentType.DESIGN,
    createdAt: "2025-01-13T10:00:00Z",
    updatedAt: "2025-01-13T10:00:00Z"
  },
  {
    id: "8",
    name: "BioShield",
    registrationDate: "31/01/2025",
    uid: "CR-2674-ASDF-2025",
    status: PatentStatus.PENDING,
    type: PatentType.PATENT,
    createdAt: "2025-01-31T10:00:00Z",
    updatedAt: "2025-01-31T10:00:00Z"
  },
  {
    id: "9",
    name: "NanoTextile",
    registrationDate: "20/02/2025",
    uid: "IN-9856-BVCX-2025",
    status: PatentStatus.APPROVED,
    type: PatentType.DESIGN,
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z"
  },
  {
    id: "10",
    name: "DataForge",
    registrationDate: "25/02/2025",
    uid: "UX-7193-QWER-2025",
    status: PatentStatus.APPROVED,
    type: PatentType.COPYRIGHT,
    createdAt: "2025-02-25T10:00:00Z",
    updatedAt: "2025-02-25T10:00:00Z"
  }
];

// API service functions
export const api = {
  // Patent related functions
  patents: {
    getAll: async (): Promise<Patent[]> => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return [...mockPatents];
    },
    
    getById: async (id: string): Promise<Patent> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const patent = mockPatents.find(p => p.id === id);
      if (!patent) {
        throw new Error("Patent not found");
      }
      return { ...patent };
    },
    
    create: async (patent: Omit<Patent, "id" | "createdAt" | "updatedAt">): Promise<Patent> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newPatent: Patent = {
        id: String(mockPatents.length + 1),
        ...patent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return newPatent;
    },
    
    update: async (id: string, data: Partial<Patent>): Promise<Patent> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const patentIndex = mockPatents.findIndex(p => p.id === id);
      
      if (patentIndex === -1) {
        throw new Error("Patent not found");
      }
      
      const updatedPatent = {
        ...mockPatents[patentIndex],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      return updatedPatent;
    },
    
    delete: async (id: string): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const patentIndex = mockPatents.findIndex(p => p.id === id);
      
      if (patentIndex === -1) {
        throw new Error("Patent not found");
      }
    }
  },
  
  // User related functions
  users: {
    getProfile: async (): Promise<User> => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        id: "1",
        name: "Алибек",
        surname: "Кенесов",
        email: "example@gmail.com",
        phone: "+7 (701) 801-88-82"
      };
    },
    
    updateProfile: async (data: Partial<User>): Promise<User> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        id: "1",
        name: data.name || "Алибек",
        surname: data.surname || "Кенесов",
        email: data.email || "example@gmail.com",
        phone: data.phone || "+7 (701) 801-88-82",
        photoUrl: data.photoUrl
      };
    }
  }
};
