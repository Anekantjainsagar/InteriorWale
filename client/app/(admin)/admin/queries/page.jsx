'use client'
import React, { useContext, useState } from "react";
import AdminContext from '../../../Context/AdminContext';
import { FiMail, FiPhone, FiClock, FiInfo, FiMapPin, FiSearch } from "react-icons/fi";
import Link from "next/link";

const Queries = () => {
    const { queries, refreshQueries } = useContext(AdminContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredQueries = queries?.filter(query => 
        query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.phone.includes(searchTerm) ||
        query.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.enquiryType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getEnquiryColor = (type) => {
        switch(type) {
            case 'general': return 'bg-blue-100 text-blue-800';
            case 'product': return 'bg-green-100 text-green-800';
            case 'support': return 'bg-purple-100 text-purple-800';
            case 'complaint': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Customer Queries</h1>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search queries..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto h-[70vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Enquiry Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Message
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Received At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredQueries?.length > 0 ? (
                                filteredQueries.map((query) => (
                                    <tr key={query._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{query.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <Link 
                                                    href={`mailto:${query.email}`} 
                                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <FiMail className="mr-1" /> {query.email}
                                                </Link>
                                                <Link 
                                                    href={`tel:${query.phone}`} 
                                                    className="flex items-center text-green-600 hover:text-green-800"
                                                >
                                                    <FiPhone className="mr-1" /> {query.phone}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEnquiryColor(query.enquiryType)}`}>
                                                {query.enquiryType.charAt(0).toUpperCase() + query.enquiryType.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-gray-500">
                                                <FiMapPin className="mr-1" /> {query.city}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-gray-500 max-w-xs truncate">
                                                <FiInfo className="mr-1 flex-shrink-0" /> 
                                                <span className="truncate" title={query.message}>
                                                    {query.message}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <FiClock className="mr-1" /> {formatDate(query.createdAt)}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        {searchTerm ? 'No matching queries found' : 'No queries available'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Queries;