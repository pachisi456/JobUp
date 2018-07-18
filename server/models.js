module.exports = function (mongoose) {
    const userSchema = mongoose.Schema({
        userId: {type: Number, required: false},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        jobHistoryAsEmployer: {type: [Number], required: false},
        jobHistoryAsWorker: {type: [Number], required: false},
        userName: {type: String, required: false},
        password: {type: String, required: false},
        description: {type: String, required: false},
        occupation: {type: String, required: false},
        email: {type: String, required: false},
        phonenumber: {type: Number, required: false}
    });
    const jobSchema = mongoose.Schema({
        jobId: {type: Number, required: false},
        jobTitle: {type: String, required: false},
        jobCreationDate: {type: Date, required: false},
        jobDescription: {type: String, required: false},
        jobImage: {type: Buffer, required: false},
        jobLat: {type: Number, required: false},
        jobLon: {type: Number, required: false},
        jobCategory: {type: String, required: false},
        jobSubcategory: {type: String, required: false},
        jobSalary: {type: String, required: false},
        jobDuration: {type: String, required: false},
        jobEmployer: {type: String, required: false},
        jobStatus: {type: String, required: false},
        jobTemptedWorkers: {type: [Number], required: false},
        jobDeclinedWorkers: {type: String, required: false},
        jobWorker: {type: String, required: false}
    });
    return models = {
        user: mongoose.model('user', userSchema),
        job: mongoose.model('job', jobSchema)
    };
};