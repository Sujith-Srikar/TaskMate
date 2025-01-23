import { Response } from "express"
import Task from "../models/task.model"
import CustomRequest from "../types/express";

export const createTask = async (req: CustomRequest, res: Response) => {
    try {
        const {title, description, startTime, endTime, priority, status} = req.body;
        const task = new Task({title, description, startTime, endTime, priority, status});
        await task.save();
        res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err)
    }
}

export const updateTask = async (req: CustomRequest, res: Response) => {
    try {
        const {title, description, startTime, endTime, priority, status} = req.body;
        const taksId = req.params.id;
        const task = await Task.findByIdAndUpdate(taksId, {title, description, startTime, endTime, priority, status});
        if(!task)
            res.status(400).json('Task not found')
        res.status(200).json({ message: "Task updated successfully" });
        
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err)
    }
}

export const deleteTask = async (req: CustomRequest, res: Response) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        if(!task)
            res.status(400).json('Task not found');
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err)
    }
}

export const getAllTasks = async (req: CustomRequest,res: Response) => {
    try {
        if(!req.user)   
            res.status(401).json({message: "Unauthorized"})
        const userId = (req.user as { _id: string })._id; // Type assertion
        const tasks = await Task.find({userId});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err)
    }
}

export const getAllStats = async (req: CustomRequest, res: Response)=>{
    try {
        if (!req.user) 
            return res.status(401).json({ message: "Unauthorized" });
        const userId = (req.user as { _id: string })._id; // Type assertion
        const tasks = await Task.find({ userId });
        if (!tasks.length) {
          return {
            totalTasks: 0,
            percentCompleted: 0,
            percentPending: 0,
            pendingTaskTimes: [],
            averageActualTime: 0,
          };
        }
        // calculating total number of tasks
        const totalTasks = tasks.length;
        let completedTasks = tasks.filter((x)=> x.status==="completed");
        let pendingTasks = tasks.filter((x) => x.status === "pending");

        // calculating percentage of completion and pending
        let percentCompleted = (completedTasks.length / totalTasks) * 100;
        let percentPending = (pendingTasks.length / totalTasks) * 100;
        
        // calculating average actual time of completed tasks
        const completedTaskTimes = completedTasks.map((task)=>{
            let startTime = new Date(task.startTime).getTime();
            let endTime = new Date(task.endTime).getTime();
            let actualTime = endTime - startTime;
            return actualTime/(60*1000); // converted to min
        })

        const totalActualTime = completedTaskTimes.reduce((sum, time) => sum+time, 0);
        const averageCompletionTime = completedTaskTimes.length ? totalActualTime / completedTaskTimes.length : 0;

        // calculating time lapsed and balance time for pending tasks
        const pendingTaskTimes = pendingTasks.map((task)=>{
            const now = new Date();
            let startTime = new Date(task.startTime).getTime();
            let endTime = new Date(task.endTime).getTime();
            const timeLapsed = Math.max(0,(now.getTime() - startTime)/ (60*1000)); // in minutes
            const balanceTime = Math.max(0, (endTime - now.getTime()) / (60*1000)); // in minutes
            return {timeLapsed, balanceTime}
        })

        const stats = {
            totalTasks,
            percentCompleted,
            percentPending,
            pendingTaskTimes,
            averageCompletionTime,
        }
        res.status(200).json(stats);

    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err)
    }
}