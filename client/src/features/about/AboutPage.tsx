import {List, 
  Alert,
  Button,
  ButtonGroup,
  Container,
  ListItem,
  Typography,
  AlertTitle,
} from "@mui/material";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";
import { useState } from "react";
export default function AboutPage() {
  const [errors, setErrors] = useState<string[]>([]);
  const [get400Error] = useLazyGet400ErrorQuery();
  const [get401Error] = useLazyGet401ErrorQuery();
  const [get404Error] = useLazyGet404ErrorQuery();
  const [get500Error] = useLazyGet500ErrorQuery();
  const [getValidationError] = useLazyGetValidationErrorQuery();

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            get400Error()
              .unwrap()
              .catch((error) => console.log(error))
          }
        >
          400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            get401Error()
              .unwrap()
              .catch((error) => console.log(error))
          }
        >
          401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            get404Error()
              .unwrap()
              .catch((error) => console.log(error))
          }
        >
          404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            get500Error()
              .unwrap()
              .catch((error) => console.log(error))
          }
        >
          500 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            getValidationError()
              .unwrap()
              .catch((error) => {
                console.log(Object.values(error.data.errors).join(","));
                setErrors(Object.values(error.data.errors));
              })
          }
        >
          Validation Error
        </Button>
      </ButtonGroup>
      {errors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {errors.map((error) => (
              <ListItem key={error}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
