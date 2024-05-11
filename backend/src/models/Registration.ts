import mongoose, {CallbackWithoutResult, Document, Model, Schema} from 'mongoose';
import {IUser} from "./User";
import {Course, ICourse} from "./Course";

export interface IRegistration extends Document {
    user: IUser;
    course: ICourse;
    appointmentId: string;
    date: Date;
}

export const RegistrationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    appointmentId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

/**
 * Validations
 */



/**
 * Methods
 */


/**
 * Statics
 */

RegistrationSchema.pre('save', async function (next) {
    const registration = this;
    const course: ICourse | null = await Course.findOne({ _id: registration.course });
    if (!course) {
        return next(new Error('Course not found'));
    }
    const appointment = course.appointments.find((appointment) => {
        return appointment._id.toString() === registration.appointmentId.toString();
    });
    if (!appointment) {
        return next(new Error('Appointment not found'));
    }
    if (appointment.registrations.length >= course.capacity) {
        return next(new Error('Appointment is full'));
    }
    next();
});

RegistrationSchema.post('save', async function (doc: IRegistration) {
     doc.populate('course').then((doc) => {
        doc.course.appointments.map((appointment) => {
            if (appointment._id.toString() === doc.appointmentId.toString()) {
                appointment.registrations.push(doc._id);
            }
        });
        doc.course.save();
    });
});

RegistrationSchema.post('findOneAndDelete', async function (doc: any) {
    Course.findOne({ _id: doc.course }).then((course: ICourse | null) => {
        course?.appointments.map((appointment) => {
            if (appointment._id.toString() === doc.appointmentId.toString()) {
                appointment.registrations = appointment.registrations.filter((registration) => {
                    return registration.toString() !== doc._id.toString();
                });
            }
        });
        course?.save();

    });
});

export const Registration: Model<IRegistration> = mongoose.model<IRegistration>('Registration', RegistrationSchema);