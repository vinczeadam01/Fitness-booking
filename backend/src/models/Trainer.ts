import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITrainer extends Document {
    name: string;
    description: string;
    img?: string;
}

export const TrainerScheme = new Schema({
    name: {type: String, required: true, trim: true, maxLength: 40},
    description: {type: String, required: true, trim: true, maxLength: 200},
    img: {type: String, required: false}
});

/**
 * Validations
 */
TrainerScheme.path('name').validate(function validateName(name: string) {
    return name.length;
});

TrainerScheme.path('description').validate(function validateDescription(description: string) {
    return description.length;
});


/**
 * Methods
 */
TrainerScheme.methods = {

}

/**
 * Statics
 */
TrainerScheme.statics = {
}


export const Trainer: Model<ITrainer> = mongoose.model<ITrainer>('Trainer', TrainerScheme);