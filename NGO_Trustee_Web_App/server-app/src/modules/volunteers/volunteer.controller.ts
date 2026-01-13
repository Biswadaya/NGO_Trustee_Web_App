import { Request, Response, NextFunction } from 'express';
import * as VolunteerService from './volunteer.service';

export const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // @ts-ignore - Validated by middleware
        const activatedBy = req.user.userId;

        const volunteer = await VolunteerService.activateVolunteer(id, activatedBy);

        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const data = await VolunteerService.getVolunteerStats(userId);
        res.status(200).json({ status: 'success', data });
    } catch (error) {
        next(error);
    }
};


export const generateId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await VolunteerService.generateIdCard(id);

        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
};

export const payMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const result = await VolunteerService.payMembership(id, amount);

        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
};

// export const list = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const volunteers = await VolunteerService.getVolunteers();
//         res.status(200).json({ status: 'success', data: { volunteers } });
//     } catch (error) {
//         next(error);
//     }
// };

export const getPersonalInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteer = await VolunteerService.getVolunteerPersonalInfo(req.params.id);
        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        const volunteer = await VolunteerService.updateVolunteerStatus(req.params.id, status);
        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const getIdCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCard = await VolunteerService.getVolunteerIdCard(req.params.id);
        res.status(200).json({ status: 'success', data: idCard });
    } catch (error) {
        next(error);
    }
};

export const listIdCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCards = await VolunteerService.getAllIdCards();
        res.status(200).json({ status: 'success', data: { idCards } });
    } catch (error) {
        next(error);
    }
};

export const revokeId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteer = await VolunteerService.revokeIdCard(req.params.id);
        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const getUniqueId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uniqueId = await VolunteerService.getVolunteerUniqueId(req.params.id);
        res.status(200).json({ status: 'success', data: { uniqueId } });
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteer = await VolunteerService.registerVolunteer(req.body);
        res.status(201).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

// --- Task Management ---
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await VolunteerService.getTasks(req.params.id);
        res.status(200).json({ status: 'success', data: { tasks } });
    } catch (error) {
        next(error);
    }
};

export const listAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await VolunteerService.listAllTasks();
        res.status(200).json({ status: 'success', data: { tasks } });
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await VolunteerService.createTask(req.body);
        res.status(201).json({ status: 'success', data: { task } });
    } catch (error) {
        next(error);
    }
};

export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await VolunteerService.updateTaskStatus(req.params.taskId, req.body.status);
        res.status(200).json({ status: 'success', data: { task } });
    } catch (error) {
        next(error);
    }
};

// --- Group Management ---
export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;
        const group = await VolunteerService.createGroup(name, description);
        res.status(201).json({ status: 'success', data: { group } });
    } catch (error) {
        next(error);
    }
};

export const listGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await VolunteerService.listGroups();
        res.status(200).json({ status: 'success', data: { groups } });
    } catch (error) {
        next(error);
    }
};

export const getGroupMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const members = await VolunteerService.getGroupMembers(req.params.groupId);
        res.status(200).json({ status: 'success', data: { members } });
    } catch (error) {
        next(error);
    }
};

export const addMembersToGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { volunteerIds } = req.body;
        const group = await VolunteerService.addMembersToGroup(req.params.groupId, volunteerIds);
        res.status(200).json({ status: 'success', data: { group } });
    } catch (error) {
        next(error);
    }
};

export const removeMemberFromGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { volunteerId } = req.params;
        const group = await VolunteerService.removeMemberFromGroup(req.params.groupId, volunteerId);
        res.status(200).json({ status: 'success', data: { group } });
    } catch (error) {
        next(error);
    }
};

// --- Bulk Task Assignment ---
export const assignTaskBulk = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await VolunteerService.assignTaskToTarget(req.body);
        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
};


