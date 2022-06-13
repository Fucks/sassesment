export interface Menu {
    title: string;
    path: string;
    icon?: string;
}

export const NavigationMenus: Menu[] = [
    {
        icon: 'group',
        path: 'PatientList',
        title: 'Pacientes'
    },
    {
        icon: 'assignment',
        path: 'PatientList1',
        title: 'Atendimentos'
    },
    {
        icon: 'person',
        path: 'PatientList2',
        title: 'Meu perfil'
    },
    {
        icon: 'logout',
        path: 'PatientList3',
        title: 'Desconectar'
    },
]