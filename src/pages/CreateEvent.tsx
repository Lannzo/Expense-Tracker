import {Formik, Form, Field, FieldArray, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type EventFormValues = {
    name: string;
    date: string;
    participants: string[];
};

const CreateEvent = () => {
    const initialValues: EventFormValues = {
        name: '',
        date: '',
        participants: [''],
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Event name is required'),
        date: Yup.date().required('Event date is required'),
        participants: Yup.array().of(Yup.string().required('Participant name is required')).min(1, 'At least one participant is required'),
    });

    const handleSubmit = (values: EventFormValues) => {
        console.log('Event Created:', values);
        toast.success('Event created successfully!');
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Create New Event</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values}) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block font-medium">Event Name</label>
                            <Field name="name" className="w-full p-2 border rounded" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label className="block font-medium">Event Date</label>
                            <Field name="date" type="date" className="w-full p-2 border rounded" />
                            <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label className="block font-medium">Participants</label>
                            <FieldArray name="participants">
                                {({ remove,push}) =>(
                                    <div className="space-y-2">
                                        {values.participants.map((_, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <Field name={`participants.${index}`} placeholder={`Person ${index +1}`}className="w-full p-2 border rounded" />
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ✖
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push('')}
                                            className="bg-blue-600 text-white px-3 py-1 rounded"> + Add Participant</button>
                                        </div>
                                )}
                            </FieldArray>
                            <ErrorMessage name="participants" component="div" className="text-red-500 text-sm" />
                        </div>
                        <button type = "submit" className = "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Create Event
                        </button>
                    </Form>
                )}
            </Formik>
            <ToastContainer position="top-center" autoClose={2000} />

        </div>

    );

};

export default CreateEvent;