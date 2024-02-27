/* eslint-disable @typescript-eslint/no-unused-vars */
/*  react/no-unescaped-entities */
'use client';
import * as React from 'react';
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  Skeleton,
  useTheme,
  CircularProgress,
} from '@mui/material';
import DailTaskSTatusIcon from '@/iconComponents/dailyTaskStatusIcon';
import {
  DailyTaskType,
  useCollectTaskCompletedRewardMutation,
  useGetDailyTaskListQuery,
} from '@/lib/redux/slices/earnings';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GradientOutlinedButton } from '@/components/GradientComponents';
import { GradientText } from '@/components/usernameLink';
import RemainingTimer from './remainingTimer';
import { useToast } from '@/components/Toast/useToast';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#1B1830' : 'rgba(161, 197, 255, 0.13)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(11, 8, 31, 1)' : '#fff',
  },
}));

function DailyTaskTable({ rows, collectRewardPoint, isLoading }: { isLoading: boolean; collectRewardPoint: (taskId: string) => void; rows: DailyTaskType[] }) {
  const [taskId, setTaskId] = React.useState('');

  const collectTaskId = (taskIdValue) => {
    setTaskId(taskIdValue);
    collectRewardPoint(taskIdValue);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Remaining Time</StyledTableCell>
            <StyledTableCell align="left">
              Name & Task Description
            </StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="right">Reward</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.taskReward + 'reward-' + index}>
              <StyledTableCell component="th" scope="row">
                <RemainingTimer />
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.taskDescription}
              </StyledTableCell>
              <StyledTableCell align="center">{row.taskStatus}</StyledTableCell>
              <StyledTableCell align="right">
                {
                  taskId === row.dailyTaskId && isLoading ? <CircularProgress /> : <GradientOutlinedButton  onClick={() => row.canGetReward && !row.isCompleted ? collectTaskId(row.dailyTaskId) : void (0)} disabled={!row.canGetReward} variant={"outlined"}>
                    <GradientText>{row.canGetReward && !row.isCompleted ? "Collect" : !row.canGetReward && row.isCompleted ?  "Collected"  : row.taskReward}</GradientText>
                  </GradientOutlinedButton>
                }

              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Example usage of the styled components
const DailyTask: React.FC = () => {
  const { palette } = useTheme();
  const {
    data: itemsdailyTaskList,
    isLoading: dailtyTaskLoading,
  } = useGetDailyTaskListQuery();
  const toast = useToast();
  const [collectReward, { isLoading, isSuccess, error }] = useCollectTaskCompletedRewardMutation();
  const isMobile = useMediaQuery('(max-width:480px)');
  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Reward Collected!");

    }
    if (error) {
      const message =  (error as any ).data.value.data ==='please_complete_task_first_to_collect_reward' ? "Please complete task first" : "something went wrong!";
      toast.error(message ?? "Something went wrong in task collection");
    }

  }, [isSuccess, error]);

  const collectRewardPoint = React.useCallback((taskId) => {
    collectReward({ taskId });
  }, []);

  return (
    <Box
      sx={{
        p: isMobile ? 0 : 2,
        overflow: 'hidden',
        borderRadius: '10px',
        backgroundColor: palette.primary.mainBackground,
      }}
    >
      <Box p={1}>
        <Stack gap={2} alignItems="center" display="flex" direction="row">
          <DailTaskSTatusIcon fill={palette.background.default} />
          <Typography variant="body2" color="textPrimary">
            Every 24 hours the daily task system is reset. Those task you
            don&apos;t finish disappear and new ones appear. After restarting,
            the tasks will reappear at different times. Check the tab and
            don&apos;t miss an opportunity to earn! Good luck!
          </Typography>
        </Stack>
      </Box>
      <Box p={2} textAlign="center">
        {!dailtyTaskLoading && itemsdailyTaskList ? (
          <DailyTaskTable collectRewardPoint={collectRewardPoint} isLoading={isLoading} rows={itemsdailyTaskList} />
        ) : (
          <Stack gap={1}>
            <Skeleton variant="rectangular" width="100%" height={'60px'} />
            <Skeleton variant="rectangular" width="100%" height={'60px'} />
            <Skeleton variant="rectangular" width="100%" height={'30px'} />
            <Skeleton variant="rectangular" width="100%" height={'30px'} />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(DailyTask);
