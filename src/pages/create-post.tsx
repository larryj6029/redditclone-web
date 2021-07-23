import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const { error } = await createPost({ input: values });
            if (error?.message.includes("not authenticated")) {
              router.push("login");
            } else router.push("/");
            //   const response = await login(values);
            //   if (response.data?.login.errors) {
            //     setErrors(toErrorMap(response.data.login.errors));
            //   } else if (response.data?.login.user) {
            //     router.push("/");
            //   }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                textarea={false}
                name="title"
                placeholder="title"
                label="Title"
              />
              <Box mt={4}>
                <InputField
                  textarea={true}
                  name="text"
                  placeholder="text..."
                  label="Body"
                />
              </Box>
              <Button
                type="submit"
                mt={5}
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Create Post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
