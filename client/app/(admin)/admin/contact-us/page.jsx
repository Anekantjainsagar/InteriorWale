"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import API_URI from "../../../../utils/urls";
import { getCookie } from "../../../../utils/cookies";
import toast from "react-hot-toast";
import AdminContext from "../../../Context/AdminContext";

const ContactUs = () => {
  const { contact, refreshContact } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    corporate: {
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      },
      additionalInfo: "",
      isActive: true,
    },
    manufacturing: {
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      },
      additionalInfo: "",
      isActive: true,
    },
    contactDetails: {
      phoneNumbers: [""],
      email: "",
      isActive: true,
    },
  });

  useEffect(() => {
    fetchOfficeData();
  }, [contact]);

  const fetchOfficeData = async () => {
    const newFormData = {
      corporate: {
        address: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "India",
        },
        additionalInfo: "",
        isActive: true,
      },
      manufacturing: {
        address: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "India",
        },
        additionalInfo: "",
        isActive: true,
      },
      contactDetails: {
        phoneNumbers: [""],
        email: "",
        isActive: true,
      },
    };

    if (contact?.length > 0) {
      contact.forEach((item) => {
        if (item.type === "corporate") {
          newFormData.corporate = {
            address: item.address || newFormData.corporate.address,
            additionalInfo: item.additionalInfo || "",
            isActive: item.isActive,
          };
        } else if (item.type === "manufacturing") {
          newFormData.manufacturing = {
            address: item.address || newFormData.manufacturing.address,
            additionalInfo: item.additionalInfo || "",
            isActive: item.isActive,
          };
        } else if (item.type === "contact") {
          newFormData.contactDetails = {
            phoneNumbers: item.phoneNumbers || [""],
            email: item.email || "",
            isActive: item.isActive,
          };
        }
      });
    }

    setFormData(newFormData);
    setIsLoading(false);
  };

  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [parent]: {
          ...prev[type][parent],
          [child]: value,
        },
      },
    }));
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...formData.contactDetails.phoneNumbers];
    newPhoneNumbers[index] = value;
    setFormData((prev) => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        phoneNumbers: newPhoneNumbers,
      },
    }));
  };

  const addPhoneNumber = () => {
    setFormData((prev) => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        phoneNumbers: [...prev.contactDetails.phoneNumbers, ""],
      },
    }));
  };

  const removePhoneNumber = (index) => {
    const newPhoneNumbers = formData.contactDetails.phoneNumbers.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        phoneNumbers: newPhoneNumbers,
      },
    }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setIsLoading(true);
    const token = getCookie("token");

    try {
      let dataToSend;

      if (type === "contact") {
        // Filter out empty phone numbers and ensure at least one is provided
        const validPhoneNumbers = formData.contactDetails.phoneNumbers.filter(
          (num) => num.trim() !== ""
        );

        if (validPhoneNumbers.length === 0) {
          toast.error("At least one phone number is required");
          setIsLoading(false);
          return;
        }

        // Match the schema structure for contact type
        dataToSend = {
          type: "contact",
          phoneNumbers: validPhoneNumbers,
          email: formData.contactDetails.email.trim(),
          isActive: formData.contactDetails.isActive,
        };
      } else {
        // Match the schema structure for office types
        dataToSend = {
          type: type,
          address: formData[type].address,
          additionalInfo: formData[type].additionalInfo,
          isActive: formData[type].isActive,
        };
      }

      const existingItem = contact?.find((item) => item.type === type);
      const endpoint = existingItem
        ? `${API_URI}/api/v1/admin/contact/update/${existingItem._id}`
        : `${API_URI}/api/v1/admin/contact/add`;

      const method = existingItem ? "put" : "post";

      console.log("Sending data:", dataToSend);
      console.log("To endpoint:", endpoint);
      console.log("Using method:", method);

      const response = await axios[method](endpoint, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);

      if (response.data) {
        toast.success(
          existingItem
            ? `${
                type.charAt(0).toUpperCase() + type.slice(1)
              } updated successfully`
            : `${
                type.charAt(0).toUpperCase() + type.slice(1)
              } created successfully`
        );
        refreshContact();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const renderOfficeForm = (type) => (
    <div key={type} className="mb-12 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6 capitalize">{type} Office</h2>

      <form onSubmit={(e) => handleSubmit(e, type)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              name="address.line1"
              value={formData[type].address.line1}
              onChange={(e) => handleAddressChange(e, type)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              name="address.line2"
              value={formData[type].address.line2}
              onChange={(e) => handleAddressChange(e, type)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="address.city"
              value={formData[type].address.city}
              onChange={(e) => handleAddressChange(e, type)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="address.state"
              value={formData[type].address.state}
              onChange={(e) => handleAddressChange(e, type)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="address.postalCode"
              value={formData[type].address.postalCode}
              onChange={(e) => handleAddressChange(e, type)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="address.country"
              value={formData[type].address.country}
              onChange={(e) => handleAddressChange(e, type)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Additional Info */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData[type].additionalInfo}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [type]: {
                    ...prev[type],
                    additionalInfo: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`${type}-active`}
              checked={formData[type].isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [type]: {
                    ...prev[type],
                    isActive: e.target.checked,
                  },
                }))
              }
              className="mr-2"
            />
            <label htmlFor={`${type}-active`} className="text-sm font-medium">
              Active
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading
              ? "Processing..."
              : contact?.some((item) => item.type === type)
              ? `Update ${type.charAt(0).toUpperCase() + type.slice(1)} Office`
              : `Create ${type.charAt(0).toUpperCase() + type.slice(1)} Office`}
          </button>
        </div>
      </form>
    </div>
  );

  const renderContactForm = () => (
    <div className="mb-12 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
      <form onSubmit={(e) => handleSubmit(e, "contact")} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.contactDetails.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactDetails: {
                    ...prev.contactDetails,
                    email: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Phone Numbers
            </label>
            {formData.contactDetails.phoneNumbers.map((number, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="tel"
                  value={number}
                  onChange={(e) =>
                    handlePhoneNumberChange(index, e.target.value)
                  }
                  className="flex-1 p-2 border rounded"
                  required={index === 0}
                />
                {formData.contactDetails.phoneNumbers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhoneNumber(index)}
                    className="px-3 bg-red-100 text-red-600 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPhoneNumber}
              className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded"
            >
              Add Phone Number
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="contact-active"
              checked={formData.contactDetails.isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactDetails: {
                    ...prev.contactDetails,
                    isActive: e.target.checked,
                  },
                }))
              }
              className="mr-2"
            />
            <label htmlFor="contact-active" className="text-sm font-medium">
              Active
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading
              ? "Processing..."
              : contact?.some((item) => item.type === "contact")
              ? "Update Contact Details"
              : "Create Contact Details"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Information</h1>
      {renderOfficeForm("corporate")}
      {renderOfficeForm("manufacturing")}
      {renderContactForm()}
    </div>
  );
};

export default ContactUs;
