import * as React from "react";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  error?: string;
}

const InputWithErrorMessage: React.FC<Props> = (props) => {
  const { error } = props;
  return (
    <>
      <TextInput style={styles.input} {...props} />
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default InputWithErrorMessage;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 12
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4
  }
});
