import { Injectable } from '@angular/core'

const buttons = {
	login: $localize `Entrar`,
	save: $localize `Salvar`,
	add: $localize `Adicionar`,
	edit: $localize `Editar`,
	delete: $localize `Deletar`,
	cancel: $localize `Cancelar`,
	clear: $localize `Limpar`,
} as const

const login = {
	title: $localize `Sistema Clínicas`,
	user: $localize `Usuário`,
	pass: $localize `Senha`,
} as const

const clinics = {
	title: $localize `Clínicas`,
	access: $localize `Acessar`,
	configs: $localize `Configurações`,
} as const

const newClinic = {
	title: $localize `Adicionar Clínicas`,
	addClinic: $localize `Adicionar Clínicas`,
	clinicName: $localize `Nome`,
	addClinicBtn: $localize `Adicionar`,
} as const

const navbar = {
	title: $localize `Sistema Clínicas`,
	clinics: $localize `Clínicas`,
} as const

const sidenav = {
	dashboard: $localize `Visão geral`,
	patients: $localize `Pacientes`,
	clinical: $localize `Clínico`,
	payments: $localize `Pagamentos`,
	configs: $localize `Configurações`,
} as const

const patients = {
	title: $localize `Pacientes`,
	subTitle: $localize `Procurar Pacientes`,
	addPatient: $localize `Adicionar Paciente`,
	editPatient: $localize `Editar Paciente`,
	completeName: $localize `Nome Completo`,
	birthday: $localize `Data de nascimento`,
	rg: $localize `RG`,
	cpf: $localize `CPF`,
	phones: $localize `Telefones`,
	phone: $localize `Telefone`,
	card: $localize `Ficha`,
	actions: $localize `Ações`,
	noPatientFound: $localize `Nenhum paciente cadastrado`,
} as const

const payments = {
	title: $localize `Pagamentos`,
	subTitle: $localize `Encontrar Pagamentos`,
	noPaymentsFound: $localize `Nenhum pagamento encontrado`,
	paymentDate: $localize `Data do pagamento`,
	updatedAt: $localize `Atualizado em`,
	value: $localize `Valor`,
	method: $localize `Método`,
	options: $localize `Opções`,
	addPayment: $localize `Adicionar pagamento`,
	updatePayment: $localize `Editar pagamento`,
} as const

const configs = {
	title: $localize `Configurações`,
	subTitle1: $localize `Configuração Geral da Clínica`,
	inputClinicName: $localize `Nome da clínica`,
	inputAddress: $localize `Endereço`,
	inputCity: $localize `Cidade`,
	inputUF: $localize `UF`,
	inputCEP: $localize `CEP`,
	inputCompanyName: $localize `Razão Social`,
	inputCNPJ: $localize `CNPJ`,
	subTitle2: $localize `Ajuste dos usuários`,
	subTitle3: $localize `Área de perigo!`,
	deleteClinic: $localize `Deletar Clínica`,
	deleteDesc: $localize `O processo é irreversível. Assim que deletar sua clínica você não terá mais acesso nenhum a ela.`,
} as const

const users = {
	title: $localize `Adicionar usuários a clínica`,
	registeredUsers: $localize `Usuários cadastrados`,
	name: $localize `Nome`,
	user: $localize `Usuário`,
	actions: $localize `Ações`,
	noUserFound: $localize `Nenhum usuário encontrado`,
	updatePass: $localize `Atualizar senha`,
	pass: $localize `Senha`,
	repeatPass: $localize `Repita a senha`,
	addUser: $localize `Adicionar Usuário`,
	editUser: $localize `Editar Usuário`,
} as const

const deleteDialog = {
	title: $localize `Deletar`,

} as const

@Injectable({
	providedIn: 'root',
})
export class TextProviderService {
	get buttons() {
		return buttons
	}

	get loginPage() {
		return login
	}

	get clinicsPage() {
		return clinics
	}

	get newClinic() {
		return newClinic
	}

	get navbar() {
		return navbar
	}

	get sideNav() {
		return sidenav
	}

	get patients() {
		return patients
	}

	get payments() {
		return payments
	}

	get configs() {
		return configs
	}

	get users() {
		return users
	}

	get deleteDialog() {
		return deleteDialog
	}

	constructor() { }
}
