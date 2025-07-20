import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../app/hooks';
import { createEvent } from '../features/event/eventSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Event name is required.'),
  participants: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Participant name cannot be empty.'),
      })
    )
    .min(2, 'At least two participants are required.'),
});

const CreateEventForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Start a New Event</h2>
      <Formik
        initialValues={{ name: '', participants: [{ name: '' }, { name: '' }] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(createEvent(values));
          toast.success(`Event "${values.name}" created successfully!`);
          navigate('/event');
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <FieldArray name="participants">
              {({ push, remove }) => (
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Participants</h3>
                  {values.participants.map((_, index) => (
                    <div key={index} className="mt-2">
                      <div className="flex items-center space-x-2">
                        <Field
                          name={`participants.${index}.name`}
                          placeholder={`Participant ${index + 1}`}
                          className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-full leading-none"
                        >
                          X
                        </button>
                      </div>
                      {/* FIX: Added ErrorMessage for each participant input */}
                      <ErrorMessage
                        name={`participants.${index}.name`}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ))}
                  
                  {/* FIX: Display array-level errors (like min length) as a string */}
                  {typeof errors.participants === 'string' ? (
                      <div className="text-red-500 text-sm mt-1">{errors.participants}</div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => push({ name: '' })}
                    className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Add Participant
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Create Event
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventForm;