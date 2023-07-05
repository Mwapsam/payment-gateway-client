import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MessageCard, Project } from '../../components';
import { AppDispatch, RootState } from '../../store/store';
import { getProjects } from '../../services/projects.service';

interface Props {
  user: any
}

const Account = (props: Props) => {
  const { projects } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();

  const [showApiKeys, setShowApiKeys] = useState<boolean[]>([]);

  const toggleApiKeys = (index: number) => {
    setShowApiKeys(prevState =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    setShowApiKeys(projects?.map(() => false));
  }, [projects]);

  const { user } = props;

  return (
    <>
      <Card className="mx-3 mt-6 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/user.png"
                alt="bruce-mars"
                size="lg"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user?.name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                 {user?.role}
                </Typography>
              </div>
            </div>
            <div>
              <Project />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 lg:grid-flow-row lg:gap-6 xl:gap-12">
            <div className="col-span-2">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                API Keys Management
              </Typography>
              <ul className="flex flex-col gap-6">
                {projects?.map((project, index) => (
                  <MessageCard
                    key={project.id}
                    name={project.name}
                    api_key={project.api_key}
                    action={
                      <Button
                        variant="text"
                        size="sm"
                        onClick={() => toggleApiKeys(index)}
                      >
                        {showApiKeys[index] ? 'Hide' : 'Show'} API Key
                      </Button>
                    }
                    showApiKeys={showApiKeys[index]}
                  />
                ))}
              </ul>
            </div>
            <div  className="lg:col-span-1">
              <div className="w-full lg:w-64">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Warning
                </Typography>
                <Typography className="text-sm text-red-500">
                  Keep your API keys securely and avoid sharing them with unauthorized individuals. They provide access to sensitive data and functionality of your projects.
                </Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Account;
