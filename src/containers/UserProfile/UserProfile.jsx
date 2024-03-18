import { useEffect } from 'react';
import AppLayout from '../Layout/AppLayout';
import { Paper } from '@mui/material';
import Authn from '../../components/Authn';
import { listLambdaFunctions, invokeLambdaFunction } from '../../services/awsLambdas';


const UserProfile = () => {

  useEffect(async () => {
    const functionList = await listLambdaFunctions();
    // The following request requires AWS Simple Email Service
    // const response = await invokeLambdaFunction({ functionName: 'hello', payload: 'test' });
  }, []);

  return (
    <Authn>
      <AppLayout>
        <Paper>
          <div>User Profile</div>
        </Paper>
      </AppLayout>
    </Authn>
  );
};

export default UserProfile;
