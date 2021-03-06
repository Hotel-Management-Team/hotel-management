import Customer from "../models/customer.model";

export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.find();
        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
};

export const postCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, typeCustomer, ID } = req.body;
        // add customer have id unique
        const customer = await Customer.findOne({ ID });
        if (customer) {
            return res.json({
                success: false,
                msg: 'Khách hàng đã tồn tại do ID không được trùng'
            });
        }
        const newCustomer = await Customer.create({
            name,
            email,
            phone,
            address,
            type: typeCustomer,
            ID
        });
        res.json({
            success: true,
            data: newCustomer,
            msg: 'Thêm khách hàng thành công'
        });
    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            msg: 'Có lỗi gì đó khi thêm khách hàng mới'
        });
    }
};

export const putCustomer = async (req, res) => {

};

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                msg: 'Customer not found'
            });
        }
        await customer.remove();
        res.json({
            success: true,
            msg: 'Customer removed'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
};