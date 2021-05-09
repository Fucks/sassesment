import ArchiveIcon from '@atlaskit/icon/glyph/archive';
import PersonIcon from '@atlaskit/icon/glyph/person';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import UserAvatarCircleIcon from '@atlaskit/icon/glyph/user-avatar-circle';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import UnlockCircleIcon from '@atlaskit/icon/glyph/unlock-circle';

export const MenuOptions = [
    {
        title: 'Ocupações',
        role: ['ROLE_VIEW_OCCUPATION'],
        icon: <ArchiveIcon label="" />,
        url: '/occupation'
    },
    {
        title: 'Profissionais',
        role: ['ROLE_VIEW_PROFESSIONALS'],
        icon: <PersonIcon label="" />,
        url: '/professional'
    },
    {
        title: 'Pacientes',
        role: ['ROLE_VIEW_ALL_PATIENT', 'ROLE_VIEW_PATIENT'],
        icon: <PeopleIcon label="" />,
        url: '/patient'
    },
    {
        title: 'Equipes',
        role: ['ROLE_VIEW_TEAM'],
        icon: <PeopleGroupIcon label="" />,
        url: '/team'
    },
    {
        title: 'Perfis de acesso',
        icon: <UnlockCircleIcon label="" />,
        role: ['ROLE_VIEW_PROFILES'],
        url: '/profile'
    }
]