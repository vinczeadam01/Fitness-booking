import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICourse extends Document {
    name: string;
    description: string;
    category: string;
    trainer: string;
    capacity: number;
    duration: number;
    appointments: any[];

    addAppointment(date: Date): void;
    addUserToAppointment(appointmentId: string, user: any): void;
    listAppointments(): any[];
    listUsersForAppointment(appointmentId: string): any[];
    updateAppointment(appointmentId: string, date: Date): void;
    removeUserFromAppointment(appointmentId: string, userId: string): void;
    removeAppointment(appointmentId: string): void;

}

interface CourseModel extends Model<ICourse> {
    findByTrainer(trainerId: string): Promise<ICourse[]>;
}

export const CourseSchema = new Schema<ICourse, CourseModel>({
    name: {type: String, required: true, trim: true, maxLength: 40},
    description: {type: String, required: true, trim: true, maxLength: 2000},
    category: {type: String, required: true, trim: true, maxLength: 40},
    trainer: {type: String, required: true, trim: true, maxLength: 40, ref: 'Trainer'},
    capacity: {type: Number, required: true},
    duration: {type: Number, required: true},
    appointments: [
        {
            _id: {type: String, required: true, default: () => new mongoose.Types.ObjectId().toString(), unique: true},
            date: {type: Date, required: true},
            registrations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Registration'}]
        }

    ]
});

/**
 * Validations
 */
CourseSchema.path('name').validate(function validateName(name: string) {
    return name.length;
});

CourseSchema.path('description').validate(function validateDescription(description: string) {
    return description.length;
});


/**
 * Methods
 */
CourseSchema.methods = {
    addAppointment: function (date: Date) {
        this.appointments.push({date: date, users: []});
    },
    addUserToAppointment: function (appointmentId: string, user: any) {
        const appointment = this.appointments.id(appointmentId);
        appointment.users.push(user);
    },
    listAppointments: function () {
        return this.appointments;
    },
    listUsersForAppointment: function (appointmentId: string) {
        const appointment = this.appointments.id(appointmentId);
        return appointment.users;
    },
    updateAppointment: function (appointmentId: string, date: Date) {
        const appointment = this.appointments.id(appointmentId);
        appointment.date = date;
    },
    removeUserFromAppointment: function (appointmentId: string, userId: string) {
        const appointment = this.appointments.id(appointmentId);
        appointment.users.pull(userId);
    },
    removeAppointment: function (appointmentId: string) {
        this.appointments = this.appointments.filter((a) => a._id !== appointmentId);
    }
}

/**
 * Statics
 */
CourseSchema.statics = {
    findByTrainer: function (trainerId: string) {
        return this.find({trainer: trainerId}).populate('trainer');
    }
}


export const Course: CourseModel = mongoose.model<ICourse, CourseModel>('Course', CourseSchema);