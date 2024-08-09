"use client";

import { useState } from "react";
import { sendContactForm } from "@/lib/api";

const initValues = { name: "", email: "", subject: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Contact() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <div maxW="450px" mt={12}>
      <h2>Contact</h2>
      {error && (
        <p color="red.300" my={4} fontSize="xl">
          {error}
        </p>
      )}

      <div isRequired isInvalid={touched.name && !values.name} mb={5}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          errorBorderColor="red.300"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <span>Required</span>
      </div>

      <div isRequired isInvalid={touched.email && !values.email} mb={5}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <span>Required</span>
      </div>

      <div mb={5} isRequired isInvalid={touched.subject && !values.subject}>
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          errorBorderColor="red.300"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <span>Required</span>
      </div>

      <div isRequired isInvalid={touched.message && !values.message} mb={5}>
        <label>Message</label>
        <textarea
          type="text"
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        ></textarea>
        <span>Required</span>
      </div>

      <button
        variant="outline"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={
          !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}
