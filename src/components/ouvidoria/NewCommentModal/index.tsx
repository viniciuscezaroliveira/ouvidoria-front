import { Dialog, DialogContent, DialogTitle, Grid, InputLabel, TextField } from '@mui/material'
import AuthController from 'controllers/authController'
import ComplaintController from 'controllers/complaintController'
import { PostHistoriesController } from 'controllers/postHistoriesController'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'
import { IPostHistory } from 'types/IPostHistory'

export function NewCommentModal({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [fileFieldValue, setFileFieldValue] = useState<File>()

    const { query } = useRouter()

    const { tenantId } = useAuthContext()

    async function onSubmit(formData: any) {
        const postHistoriesController = new PostHistoriesController()
        const authController = new AuthController()
        const user = authController.getUser()

        if (user) {
            if (fileFieldValue) {
                try {
                    const complaintController = new ComplaintController()
                    const uploadImageResponse = await complaintController.uploadFile(fileFieldValue)
                    const filesIds = [] as string[]
                    uploadImageResponse.map(item => filesIds.push(item.id))
                    try {
                        const formattedData: IPostHistory = {
                            comment: formData.comment,
                            user: user,
                            media: filesIds,
                            postId: query.id as string,
                            tenantId: tenantId,
                        }
                        const response = await postHistoriesController.sendNewComment(formattedData)
                    } catch (error) {
                        console.log(error)
                    }
                } catch (error) {}
            } else {
                try {
                    const formattedData: IPostHistory = {
                        comment: formData.comment,
                        user: user,
                        postId: query.id as string,
                        tenantId: tenantId,
                    }
                    const response = await postHistoriesController.sendNewComment(formattedData)
                } catch (error) {}
            }
        }
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'comment',
            label: 'Insira seu comentário',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'file',
            label: '',
            ui: { grid: 12 },
            required: false,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Selecione o arquivo</InputLabel>
                        </Grid>
                        <TextField
                            type="file"
                            onChange={e => {
                                const target = e.target as HTMLInputElement
                                const files = target.files as FileList
                                setFileFieldValue(files[0])
                            }}
                        />
                    </Grid>
                )
            },
        },
    ]

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px 18px 5px 18px' }} color="#727272" id="scroll-dialog-title">
                    Cadastrar nova ocorrência
                </DialogTitle>
                <DialogContent sx={{ padding: '0' }}>
                    <Grid
                        display="flex"
                        flexDirection="column"
                        p={2}
                        item
                        lg={8}
                        xs={12}
                        margin="0 auto"
                        minHeight={'auto'}
                        sx={{ minWidth: { xs: '100%', md: '500px' } }}
                    >
                        <ApolloForm
                            schema={formSchema}
                            initialValues={[]}
                            submitButtonText="Enviar"
                            onSubmit={onSubmit}
                            showCancelButtom
                            onCancel={handleClose}
                            cancelButtonTitle="Fechar"
                            defaultExpandedGroup={true}
                        />
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}