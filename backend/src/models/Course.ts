import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICourse extends Document {
    name: string;
    description: string;
    category: number;
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

export const CourseSchema = new Schema({
    name: {type: String, required: true, trim: true, maxLength: 40},
    description: {type: String, required: true, trim: true, maxLength: 200},
    category: {type: Number, required: true},
    trainer: {type: String, required: true, trim: true, maxLength: 40},
    capacity: {type: Number, required: true},
    duration: {type: Number, required: true},
    appointments: [
        {
            date: {type: Date, required: true},
            users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
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
        this.appointments.id(appointmentId).remove();
    }
}

/**
 * Statics
 */
CourseSchema.statics = {
}


export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', CourseSchema);