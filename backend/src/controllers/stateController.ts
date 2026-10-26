import { Request, Response } from 'express';
import { getDBStatus } from '../config/db';
import { State } from '../models/State';
import { STATES_DATA } from '../data/states';

export const getAllStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { region, type, search } = req.query;
    const { isConnected } = getDBStatus();

    if (isConnected) {
      const query: any = { isActive: true };
      if (region && typeof region === 'string') {
        query.region = region.toLowerCase();
      }
      if (type && typeof type === 'string') {
        query.type = new RegExp(`^${type}$`, 'i');
      }
      if (search && typeof search === 'string') {
        const regex = new RegExp(search, 'i');
        query.$or = [{ name: regex }, { stateCode: regex }, { cities: regex }];
      }

      const states = await State.find(query).sort({ totalCities: -1 });

      res.json({
        success: true,
        total: states.length,
        source: 'mongodb',
        data: states,
      });
      return;
    }

    // In-memory fallback
    let list = [...STATES_DATA];

    if (region && typeof region === 'string') {
      list = list.filter((s) => s.region.toLowerCase() === region.toLowerCase());
    }
    if (type && typeof type === 'string') {
      list = list.filter((s) => s.type.toLowerCase() === type.toLowerCase());
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.stateCode.toLowerCase().includes(q) ||
          s.cities.some((c) => c.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      total: list.length,
      source: 'local_fallback',
      data: list,
    });
  } catch (error: any) {
    console.error('[State Controller] Error in getAllStates:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve states and cities', error: error.message });
  }
};

export const getStateBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawSlug = req.params.slug;
    const slug = (Array.isArray(rawSlug) ? rawSlug[0] : rawSlug) || '';
    const { isConnected } = getDBStatus();

    if (isConnected) {
      const state = await State.findOne({
        $or: [
          { slug: slug.toLowerCase() },
          { stateCode: slug.toUpperCase() },
          { name: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') },
        ],
      });

      if (!state) {
        res.status(404).json({ success: false, message: `State '${slug}' not found` });
        return;
      }

      res.json({
        success: true,
        source: 'mongodb',
        data: state,
      });
      return;
    }

    // Fallback
    const cleanSlug = slug.toLowerCase();
    const state = STATES_DATA.find(
      (s) =>
        s.slug === cleanSlug ||
        s.stateCode.toLowerCase() === cleanSlug ||
        s.name.toLowerCase() === cleanSlug.replace(/-/g, ' ')
    );

    if (!state) {
      res.status(404).json({ success: false, message: `State '${slug}' not found` });
      return;
    }

    res.json({
      success: true,
      source: 'local_fallback',
      data: state,
    });
  } catch (error: any) {
    console.error('[State Controller] Error in getStateBySlug:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve state', error: error.message });
  }
};

export const getCitiesByState = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawSlug = req.params.slug;
    const slug = (Array.isArray(rawSlug) ? rawSlug[0] : rawSlug) || '';
    const { isConnected } = getDBStatus();

    let stateObj: any = null;

    if (isConnected) {
      stateObj = await State.findOne({
        $or: [
          { slug: slug.toLowerCase() },
          { stateCode: slug.toUpperCase() },
          { name: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') },
        ],
      });
    }

    if (!stateObj) {
      const cleanSlug = slug.toLowerCase();
      stateObj = STATES_DATA.find(
        (s) =>
          s.slug === cleanSlug ||
          s.stateCode.toLowerCase() === cleanSlug ||
          s.name.toLowerCase() === cleanSlug.replace(/-/g, ' ')
      );
    }

    if (!stateObj) {
      res.status(404).json({ success: false, message: `State '${slug}' not found` });
      return;
    }

    res.json({
      success: true,
      state: stateObj.name,
      stateCode: stateObj.stateCode,
      region: stateObj.region,
      capital: stateObj.capital,
      totalCities: stateObj.cities.length,
      cities: stateObj.cities,
      cityDetails: stateObj.cityDetails || [],
    });
  } catch (error: any) {
    console.error('[State Controller] Error in getCitiesByState:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve cities for state', error: error.message });
  }
};
