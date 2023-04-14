// next
import Head from 'next/head';
// @mui
import { AlertColor, Container } from '@mui/material';
// layouts
// components
import { useRouter } from 'next/router';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import React from 'react';
import BackButton from 'src/components/BackButton';
import JsonForm from 'src/components/JsonForm';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import { companyInitialValue } from 'src/utils/initialValues';
import { company } from 'Jsons/Forms/company';
import Loading from 'src/components/Loading';

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function Edicao() {

  const { themeStretch } = useSettingsContext();


  const [alertMessage, setAlertMessage] = React.useState<{ type: AlertColor, message: string }>({
    type: 'success',
    message: 'none',
  });

  const [formData, setFormData] = React.useState(companyInitialValue);

  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const [loading, setLoading] = React.useState<boolean>(false);
    // const router = useRouter();
    // const id = router.query.id as string

    // const handleGetCompany = React.useCallback(async (id: string) => {
    //     setLoading(true);
    //     const data = await getCompany(id);
    //     if (data) {
    //         setFormData(data);
    //     } else {
    //         setNoCompany(true);
    //     }
    //     setLoading(false);
    // }, []);
    // React.useEffect(() => {
    //     handleGetCompany(id);
    // }, [handleGetCompany, id]);

  const schema: RJSFSchema = {
    title: "Edição",
    ...company.schema
  };
  const uiSchema: UiSchema = company.uiSchema;


//   const onSubmit = (formItems: IChangeEvent) => {
  const onSubmit = () => {
      console.log(formData)
    //   const data = formItems.formData as CategoryCreationProps;
    //   if(data.description !== '' && data.imageUrl !== '' && data.position !== ''){
    //     const res = await createCategory(data);
    //     if(res.data != undefined){
    //       setAlertMessage({type: 'success', message: 'Cadastro efetuado com sucesso!'});
    //       setOpenSnackbar(true);
    //       router.back();
    //     }else{
    //       setAlertMessage({type: 'error', message: 'Erro ao efetuar cadastro!'});
    //       setOpenSnackbar(true);
    //     }
    //   }
  };

  if(loading)
        return <Loading />


  return (
    <>
      <Head>
        <title>Cadastro de entregador</title> {/* titulo da pagina*/}
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BackButton />
        <JsonForm
          setFormData={setFormData}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onSubmit={onSubmit}
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          alertMessage={alertMessage}
        />
      </Container>
    </>
  );
}
