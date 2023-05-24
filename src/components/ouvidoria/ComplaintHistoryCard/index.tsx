import { Card, Grid, Typography } from '@mui/material'
import moment from 'moment'
import { CustomAvatar } from 'src/components/custom-avatar'

function ComplaintHistoryCard({ date, comment, name }: { date: string; comment: string; name: string }) {
    const formattedDate = moment(date).format('DD/MM/YYYY')

    return (
        <Grid item>
            <Card>
                <Grid p={1.5}>
                    <Grid display="flex" columnGap="10px" alignItems="center" marginBottom="15px">
                        <CustomAvatar alt={name} name={name} />
                        <Typography variant="body2" fontWeight="bold">
                            {name}
                        </Typography>
                        <Typography variant="body2" fontSize="12px" sx={{ position: 'relative', top: '1px' }}>
                            {formattedDate}
                        </Typography>
                    </Grid>
                    <Typography variant="body2">{comment}</Typography>
                </Grid>
            </Card>
        </Grid>
    )
}

export default ComplaintHistoryCard