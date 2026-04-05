const recordQuery = require("../queries/recordQuery");

async function createRecord(req, res, next) {
  try {
    const { amount, type, category, record_date, notes } = req.body;

    const id = await recordQuery.createRecord({
      amount,
      type,
      category,
      record_date,
      notes,
      created_by: req.user.id
    });

    const newRecord = await recordQuery.getRecordById(id);

    res.status(201).json({
      success: true,
      message: "Record created successfully",
      data: newRecord
    });
  } catch (error) {
    next(error);
  }
}

async function getRecords(req, res, next) {
  try {
    const filters = {
      type: req.query.type,
      category: req.query.category,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const records = await recordQuery.getRecords(filters);

    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    next(error);
  }
}

async function getRecord(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const record = await recordQuery.getRecordById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
}

async function updateRecord(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const existingRecord = await recordQuery.getRecordById(id);

    if (!existingRecord) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    const { amount, type, category, record_date, notes } = req.body;

    const fields = {};
    if (amount) fields.amount = amount;
    if (type) fields.type = type;
    if (category) fields.category = category;
    if (record_date) fields.record_date = record_date;
    if (notes !== undefined) fields.notes = notes;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update"
      });
    }

    await recordQuery.updateRecord(id, fields);

    const updatedRecord = await recordQuery.getRecordById(id);

    res.json({
      success: true,
      message: "Record updated successfully",
      data: updatedRecord
    });
  } catch (error) {
    next(error);
  }
}

async function deleteRecord(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const existingRecord = await recordQuery.getRecordById(id);

    if (!existingRecord) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    await recordQuery.deleteRecord(id);

    res.json({
      success: true,
      message: "Record deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord
};