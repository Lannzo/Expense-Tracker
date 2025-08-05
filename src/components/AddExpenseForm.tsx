import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addExpense } from '../features/event/eventSlice';
import { toast } from 'react-toastify';

const AddExpenseForm = () => { // Access the Redux store to get participants and dispatch actions
  const dispatch = useAppDispatch();
  const participants = useAppSelector((state) => state.event.participants);

  const validationSchema = Yup.object().shape({ // Define validation schema for the form
    description: Yup.string().required('Description is required.'),
    amount: Yup.number().positive('Amount must be a positive number.').required('Amount is required.'),
    paidBy: Yup.string().required('You must select who paid.'),
    sharedBy: Yup.array().min(1, 'At least one participant must share the expense.'),
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-primary">Add a New Expense</h3>
        <Formik // Initialize form values and validation
            initialValues={{ description: '', amount: '', paidBy: '', sharedBy: [] as string[] }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                dispatch(addExpense({
                    description: values.description,
                    amount: Number(values.amount),
                    paidBy: values.paidBy,
                    sharedBy: values.sharedBy
                }));
                toast.success("Expense added!");
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <Field type="text" name="description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        <Field type="number" name="amount" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <ErrorMessage name="amount" component="div" className="text-red-500 text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700">Paid By</label>
                        <Field as="select" name="paidBy" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Select who paid</option>
                            {participants.map(p => ( 
                                <option key={p.id} value={p.id}>{p.name}</option> // Map through participants to create options
                            ))}
                        </Field>
                        <ErrorMessage name="paidBy" component="div" className="text-red-500 text-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shared By</label>
                        <div role="group" aria-labelledby="checkbox-group" className="mt-2 space-y-1">
                            {participants.map(p => ( 
                                <label key={p.id} className="flex items-center"> 
                                    <Field type="checkbox" name="sharedBy" value={p.id} className="h-4 w-4 text-primary border-gray-300 rounded"/>
                                    <span className="ml-2 text-gray-700">{p.name}</span>
                                </label>
                            ))}
                        </div>
                        <ErrorMessage name="sharedBy" component="div" className="text-red-500 text-sm mt-1"/> 
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
                        Add Expense
                    </button>
                </Form>
            )}
        </Formik>
    </div>
  );
};

export default AddExpenseForm;