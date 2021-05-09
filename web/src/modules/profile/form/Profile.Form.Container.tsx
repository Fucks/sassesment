import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import Button, { LoadingButton } from "@atlaskit/button";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Banner from "@atlaskit/banner";
import TextField from "@atlaskit/textfield";
import ConfirmDisableDialog from "../../../components/confirm-disable-dialog/ConfirmDisableDialog";
import { Profile, ProfileService } from "../../../services/profile/profile.service";
import ProfileSchema from "./Profile.Schema";
import { Role } from "../../../services/Authentication.service";
import { FastField, FieldArray, Formik, FormikProps } from "formik";
import styled from "styled-components";
import { CheckboxField, Field, Fieldset } from "@atlaskit/form";
import Checkbox from "@atlaskit/checkbox";
import RoleNames from "./Roles";
import FormField from "../../../components/form-field/FormField";

export interface ProfileFormContainerProps {
}

interface FormEntity {
    name: string;
    roles: string[]
}

const ProfileFormContainer: FunctionComponent<ProfileFormContainerProps> = (props) => {

    const service = new ProfileService();

    const { id } = useParams<any>();

    const breacrumbs = ["Perfil de acesso", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar perfil de acesso' : 'Cadastrar novo perfil de acesso'
    );

    const [formValues, setFormValues] = useState<FormEntity>({ name: '', roles: [] });
    const [submiting, setSubmiting] = useState(false);
    const [loadingRoles, setLoadingRoles] = useState(true);

    const [error, setError] = useState<any | null>(null);
    const [showDisablePopup, setShowDisablePopup] = useState(false);

    const [systemRoles, setSystemRoles] = useState<Role[]>();

    const history = useHistory();

    useEffect(() => {

        loadRoles();

        if (id != null) {
            initFormWithValues();
        }

    }, []);

    const loadRoles = async () => {

        setLoadingRoles(true);

        try {
            const roles = await service.getRoles();

            setSystemRoles(roles);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoadingRoles(false);
        }

    }

    const initFormWithValues = async () => {

        setSubmiting(true);

        var data = await service.getById(id);

        setFormValues(entityToFormEntity(data));

        setSubmiting(false);
    }

    const handleSave = async (values: FormEntity) => {

        setSubmiting(true);

        const entity = formEntityToEntity(values);

        try {

            if (id != null) {
                await service.update(id, entity);
            }
            else {
                await service.create(entity);
            }

            await new Promise((resolve) => { setTimeout(() => { history.push('/profile'); resolve(null) }, 3000) })
        }
        catch (err) {
            setError(err);
        }
        finally {
            setSubmiting(false);
        }
    }

    const handleDisableEntity = async () => {

        try {
            await service.disable(id);
            await setTimeout(() => history.push('/profile'), 1000)
        }
        catch (err) {
            setError(err);
            setShowDisablePopup(false);
        }
    }

    const formEntityToEntity = ({ name, roles }: FormEntity): Profile => {
        return {
            name,
            roles: (roles.map(e => systemRoles?.find(ee => ee.authority == e)).filter(e => e != null) as Role[])
        }
    }

    const entityToFormEntity = ({ name, roles }: Profile): FormEntity => {
        return {
            name,
            roles: roles.map(e => e.authority)
        }
    }

    const actions = (
        <Actions>
            {id && <Button onClick={() => setShowDisablePopup(true)} appearance="danger">Desativar</Button>}
            <LoadingButton type="submit" appearance="primary" isLoading={submiting}>Salvar</LoadingButton>
        </Actions>
    )

    const form = {
        initialValues: formValues,
        validationSchema: ProfileSchema,
        onSubmit: handleSave
    }

    const handleSelectRole = (role: string, formProps: FormikProps<FormEntity>) => {

        const index = formProps.values.roles.findIndex(e => e == role);

        const roles = formProps.values.roles;

        if (index >= 0) {
            roles.splice(index, 1);
        }
        else {
            roles.push(role)
        }

        return formProps.setFieldValue('roles', [...roles]);
    }

    const rolesElement = (formProps: FormikProps<FormEntity>) => (<Fieldset legend="Permissões" >
        {systemRoles?.map(e => (
            <CheckboxField key={e.id} name="roles" value={e.authority}>
                {({ fieldProps }) => {

                    return <Checkbox
                        {...fieldProps}
                        isChecked={formProps.values.roles.findIndex(ee => ee == e.authority) >= 0}
                        onChange={(ev) => handleSelectRole(ev.currentTarget.value, formProps)}
                        size="large"
                        label={RoleNames[e.name]} />
                }
                }
            </CheckboxField>
        ))}
    </Fieldset>)

    return (
        <Formik initialValues={formValues} enableReinitialize={true} validationSchema={ProfileSchema} onSubmit={handleSave}>
            {(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
                    <FormContainerLayout
                        title={FormTitle}
                        onBackAction={() => history.goBack()}
                        saveButton={actions}
                        breadcrumbs={breacrumbs}>
                        {error &&
                            <Banner
                                appearance="error"
                                icon={<ErrorIcon label="" secondaryColor="inherit" />}
                                isOpen>
                                {(error as any).message}
                            </Banner>
                        }
                        <Content>
                            <FormField value={formProps.initialValues.name} label="Nome do perfil de acesso" name="name" />
                            {rolesElement(formProps)}
                        </Content>
                        <ConfirmDisableDialog isOpen={showDisablePopup} onClose={() => setShowDisablePopup(false)} onConfirm={handleDisableEntity} />
                    </FormContainerLayout>
                </form>
            )}
        </Formik>
    );
}

export default ProfileFormContainer;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Content = styled.div`
    padding: 0 64px;
    flex-direction: column;
    width: 40%;
`;