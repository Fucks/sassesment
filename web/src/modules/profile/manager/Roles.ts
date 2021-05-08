interface C {
    [key: string]: string
}

const RoleNames: C = {
    'ROLE_VIEW_PROFESSIONALS': 'Ver profissionais',
    'ROLE_MANAGER_PROFESSIONALS': 'Gerenciar profissionais',
    'ROLE_VIEW_TEAM': 'Ver equipes',
    'ROLE_MANAGER_TEAM': 'Gerenciar equipes',
    'ROLE_MANAGER_OCCUPATION': 'Gerenciar ocupações',
    'ROLE_VIEW_OCCUPATION': 'Ver ocupações',
    'ROLE_VIEW_ALL_PATIENT': 'Ver todos os pacientes',
    'ROLE_VIEW_PATIENT': 'Ver pacientes por equipe',
    'ROLE_MANAGER_PATIENT': 'Gerenciar pacientes'
}

export default RoleNames;