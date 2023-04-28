import { CompanyFiltersProps, CompanyGetProps } from "services/requests/company/types";
import { DeliverymanGetProps } from "services/requests/deliveryman/types";
import { UserGetProps } from "services/requests/user/types";

export const userInitialValue = {
    cpf: '',
    name:  '',
    blocked: false,
    confirmed: true,
    email: '',
    provider: '',
    username: ''

} as UserGetProps;


export const deliverymanInitialValue = {
    business: 0,
    cpf: '',
    days: [],
    hourFinal: '',
    hourStart:  '',
    name: '',
    phone: '',
    tenant: 0,
} as DeliverymanGetProps;

export const companyInitialValue = {
    cnpj:  '',
    contactName: '',
    contactPhone: '',
    fantasyName: '',
    reasonName: '',
    status: true,

} as CompanyGetProps;

export const companyFormDataInitialValue = {
    fantasyName: '',
    reasonName: '',
    cnpj: '',
    status: true,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    uf: '',
    cep: '',
};

export const companyFiltersInitialValue = {
    reasonName: '',
    cnpj: '',
    status: true,
} as CompanyFiltersProps;