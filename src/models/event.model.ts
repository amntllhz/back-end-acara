import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const eventDAO = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    startDate: Yup.string()
        .required("Start Date is required"),
    endDate: Yup.string()
        .required("End Date is required"),
    description: Yup.string()
        .required("Description is required"),
    banner: Yup.string()
        .required("Banner is required"),
    isFeatured: Yup.boolean()
        .required("Is Featured is required"),
    isOnline: Yup.boolean(),
    isPublish: Yup.boolean(),
    category: Yup.string()
        .required("Category is required"),
    slug: Yup.string(),
    createdBy: Yup.string()
        .required("Created By is required"),
    createdAt: Yup.string(),
    updatedAt: Yup.string(),
    location: Yup.object()
        .required("Location is required"),
});

export type TEvent = Yup.InferType<typeof eventDAO>;

export interface Event extends Omit<TEvent, "category" | "createdBy"> {
    category: ObjectId,
    createdBy: ObjectId
}

const eventSchema = new Schema<Event>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    startDate: {
        type: Schema.Types.String,
        required: true,
    },
    endDate: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    banner: {
        type: Schema.Types.String,
        required: true,
    },
    isFeatured: {
        type: Schema.Types.Boolean,
        required: true,
    },
    isOnline: {
        type: Schema.Types.Boolean,
        required: true,
    },
    isPublish: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    slug: {
        type: Schema.Types.String,
        unique: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    location: {
        type: {
            region: {
                type: Schema.Types.Number
            },
            coordinates: {
                type: [Schema.Types.Number],
                default: [0, 0]
            },

        },
        required: true,
    }
}, {
    timestamps: true,
})


eventSchema.pre("save", function () {
    if (!this.slug) {
        const slug = this.name.split("").join("-").toLowerCase();
        this.slug = `${slug}`
    }
})

const EventModel = mongoose.model("Event", eventSchema)

export default EventModel