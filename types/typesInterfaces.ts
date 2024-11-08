export interface Contact {
  id?: number;
  name: string;
  city: string;
  email: string;
  phone: string;
}

export interface ContactSearch {
  id: number;
  lookupName: string;
  emails: { address: string };
  phones: { number: string };
  updatedTime?: string;
}


export interface ContactList {
  items: Contact[];
}

export interface Contacts {
  id?: number;
  name: string;
  city: string;
  emails: string;
  phones: string;
}

export interface EditContactProps {
  updateContact: {
    lookupName: string;
    emails: { address: string };
    phones: { number: string };
  };
  setUpdateContact: React.Dispatch<React.SetStateAction<any>>;
  saveUpdatedContact: (updateContact: any) => void;
}
