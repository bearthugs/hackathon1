import { Typography } from '@mui/material';

export const Lyrics = (props) => {
    const { lyric } = props
    return (
        <Typography variant='h3'>{lyric}</Typography>
    )
}